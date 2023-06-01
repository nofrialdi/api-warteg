import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { User, Role} from '@prisma/client';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(userRegisterDto: UserRegisterDto) {
    const user = await this.usersService.create(userRegisterDto);
    return { user: user };
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.usersService.validateUser(userLoginDto);

    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.role !== Role.ADMIN && user.role !== Role.CUSTOMER) {
      throw new UnauthorizedException('Invalid role');
    }

    return this.generateJWT(user);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const token = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '1h' },
    );
    const resetLink = `http://warteg.com/reset-password?token=${token}`;

    await this.mailService.sendMail(
      email,
      'Reset your password',
      `Click this link to reset your password: ${resetLink}`,
    );

    return {
      message: 'A link to reset your password has been sent to your email.',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;
    let decodedToken;
    try {
      decodedToken = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.findById(decodedToken.userId);
    if (!user) {
      throw new NotFoundException();
    }

    await this.usersService.updatePassword(user.id, newPassword);

    return { message: 'Your password has been reset successfully.' };
  }

  private generateJWT(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      user: user,
      token: this.jwtService.sign(payload),
    };
  }
}

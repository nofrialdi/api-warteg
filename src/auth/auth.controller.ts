import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserLoginDto } from '../auth/dto/user-login.dto';
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @ApiOperation({ summary: 'Create an account' })
  @ApiBody({ type: UserRegisterDto })
  @ApiOkResponse({
    type: UserEntity,
    description: 'The user has been created.',
  })
  register(@Body(ValidationPipe) userRegisterDto: UserRegisterDto) {
    return this.authService.register(userRegisterDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Sign into website' })
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ type: UserEntity, description: 'Logged in successfully.' })
  login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiResponse({
    status: 200,
    description: 'A link to reset your password has been sent to your email.',
  })
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: 200,
    description: 'Your password has been reset successfully.',
  })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}

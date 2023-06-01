import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
} from '../config/config';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: '"Warteg" <your-email>',
      to: to,
      subject: subject,
      text: text,
    });
  }
}

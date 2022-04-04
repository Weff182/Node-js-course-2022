import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public example(email: string): void {
    this.mailerService.sendMail({
      to: email,
      from: process.env.MAILDEV_INCOMING_USER,
      subject: 'Stripe charge',
      text: 'Payment has passed',
      html: '<b>Payment has passed</b>',
    });
  }
}

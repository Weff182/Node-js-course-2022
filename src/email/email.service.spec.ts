import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('Email Service', () => {
  let emailService: EmailService;
  let mailerService: MailerService;
  let empty: Promise<void>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  describe('Email Service', () => {
    it('Should create new Role', async () => {
      const email = expect.any(String);
      const sendMail = {
        to: expect.any(String),
        from: expect.any(String),
        subject: expect.any(String),
        text: expect.any(String),
        html: expect.any(String),
      };
      jest
        .spyOn(mailerService, 'sendMail')
        .mockImplementation(async () => empty);

      expect(emailService.example(email)).toEqual(empty);

      expect(mailerService.sendMail).toBeCalledWith(sendMail);
    });
  });
});

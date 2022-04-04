import { Module } from '@nestjs/common';
//stripe func
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
//modules
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';

@Module({
  providers: [StripeService],
  controllers: [StripeController],
  imports: [AuthModule, EmailModule],
  exports: [StripeService],
})
export class StripeModule {}

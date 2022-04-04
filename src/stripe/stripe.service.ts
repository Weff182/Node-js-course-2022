import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_CLIENT, {
      apiVersion: '2020-08-27',
    });
  }

  public async createCustomer(name: string, email: string) {
    return await this.stripe.customers.create({
      name,
      email,
    });
  }

  public async charge(amount: number, paymentMethodId: string, req: Request): Promise<void> {
    const authHeader: string = req.headers.authorization;
    const token: string = authHeader.split(' ')[1];
    const customer = this.jwtService.verify(token);
    await this.stripe.paymentIntents.create({
      amount,
      customer: customer.stripeCustomerId,
      payment_method: paymentMethodId,
      currency: process.env.STRIPE_CURRENCY,
      confirm: true,
    });
    await this.emailService.example(customer.email);
    return;
  }
}

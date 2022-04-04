import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateChargeDto from './dto/createCahrge.rto';
import { StripeService } from './stripe.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Платежи при использовании Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @ApiOperation({ summary: 'Функция для оплаты с помощью Stripe' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCharge(
    @Body() charge: CreateChargeDto,
    @Req() req: Request,
  ): Promise<void> {
    await this.stripeService.charge(charge.amount, charge.paymentMethodId, req);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChargeDto {
  @ApiProperty({
    example: 'pm_1KctVGLsOTS4kasdRPekup9P',
    description: 'id платежного метода',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty()
  paymentMethodId: string;

  @ApiProperty({ example: '12000', description: 'Сумма' })
  @IsNumber({}, { message: 'Должно быть числом' })
  amount: number;
}

export default CreateChargeDto;

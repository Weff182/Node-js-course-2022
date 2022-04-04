import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'id юзера' })
  @IsNumber({}, { message: 'Должно быть строкой' })
  readonly userId: number;

  @ApiProperty({ example: 'за оскарбление', description: 'Причина бана' })
  @IsString({ message: 'Должно быть строкой' })
  readonly banReason: string;
}

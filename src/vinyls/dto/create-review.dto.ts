import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'Пластинка супер', description: 'Коментарий' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateReviewInDBDto {
  @ApiProperty({ example: 'syper', description: 'Отзыв' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({ example: '1', description: 'id Винила' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly vinylId: number;

  @ApiProperty({ example: '1', description: 'id Юзера' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}

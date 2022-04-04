import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateVinylInDBDto {
  @ApiProperty({ example: "Adam's song", description: 'Название винила' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: 'Blink 182', description: 'Исполнитель' })
  @IsString({ message: 'Должно быть строкой' })
  readonly author: string;

  @ApiProperty({
    example: 'The vinyl by third almbum',
    description: 'Описание винила',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({ example: '1200', description: 'Стоимость' })
  @IsNumber({}, { message: 'Должно быть чисдлом' })
  readonly price: number;

  @ApiProperty({ example: '120img', description: 'Картинка' })
  @IsString({ message: 'Должно быть строкой' })
  readonly image: string;
}

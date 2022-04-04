import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetVynilByIdDto {
  @ApiProperty({ example: "Adam's song", description: 'Название винила' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: 'Blink 182', description: 'Исполнитель' })
  @IsString({ message: 'Должно быть строкой' })
  readonly author: string;
}

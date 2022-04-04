import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '1997-03-21', description: 'День рождения' })
  @IsDateString()
  birthdate: Date;

  @ApiProperty({ example: 'Nick', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string;

  @ApiProperty({ example: 'Green', description: 'Фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  lastName: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некоректный email' })
  readonly email: string;

  @ApiProperty({ example: 'pass123', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Пароль должен быть от 4 до 16 символов' })
  readonly password: string;

  @ApiProperty({ example: 'Max', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string;

  @ApiProperty({ example: 'Zhuk', description: 'Фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  lastName: string;

  @ApiProperty({ example: '1997-04-20', description: 'День рождения' })
  @IsDateString()
  birthdate: Date;
}

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Функция для авторизации с помощью сервиса Google' })
  @ApiResponse({ status: 200 })
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    return;
  }

  @ApiOperation({
    summary: 'Функция callback для авторизации с помощью сервиса Google',
  })
  @ApiResponse({ status: 200 })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req,
  ): Promise<'No user from google' | { token: string }> {
    return this.authService.googleLogin(req);
  }

  @ApiOperation({ summary: 'Функция для логина' })
  @Post('/login')
  login(@Body() userDto: LoginUserDto): Promise<{ token: string }> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Функция для регитсрации' })
  @Post('/registration')
  @UseInterceptors(FileInterceptor('image'))
  Registration(
    @Body() userDto: RegisterUserDto,
    @UploadedFile() image: any,
  ): Promise<{ token: string }> {
    return this.authService.registration(userDto, image);
  }
}

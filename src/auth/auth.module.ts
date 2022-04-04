import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtDecode } from './jwt-decode';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtDecode],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    HttpModule,
  ],
  exports: [AuthService, JwtModule, JwtDecode],
})
export class AuthModule {}

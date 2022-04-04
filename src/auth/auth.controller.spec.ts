import { Test } from '@nestjs/testing';
import { CanActivate } from '@nestjs/common';
import { Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

describe('AuthController', () => {
  let authController: AuthController;
  let req: Request;
  const token = expect.any(String);
  let login: LoginUserDto;

  const mockAuthService = {
    googleLogin: jest.fn(() => token),
    login: jest.fn(() => token),
    registration: jest.fn(() => token),
  };

  const mockJwtAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideGuard(AuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
  describe('AuthController', () => {
    // it('should get google auth function', () => {
    //   expect(authController.googleAuth()).toEqual(empty)
    //     expect(mockAuthService.google).toHaveBeenCalled();
    // })
    it('should get google callback auth function', () => {
      expect(authController.googleAuthRedirect(req)).toEqual(token);
      expect(mockAuthService.googleLogin).toHaveBeenCalledWith(req);
    });
    it('should get login function', () => {
      expect(authController.login(login)).toEqual(token);
      expect(mockAuthService.login).toHaveBeenCalledWith(login);
    });
    it('should get register function', () => {
      let userDto: RegisterUserDto;
      const image = expect.any(String);
      expect(authController.Registration(userDto, image)).toEqual(token);
      expect(mockAuthService.registration).toHaveBeenCalledWith(userDto, image);
    });
  });
});

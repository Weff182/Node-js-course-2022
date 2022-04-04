import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.model';
import { Request } from 'express';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let req: Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('AuthService', () => {
    it('Should google login', async () => {
      let reqUser: Users;
      let promiseUser: Promise<Users>;
      const token = expect.any(String);

      const payloadUser = {
        ...promiseUser,
        email: expect.any(String),
        id: expect.any(Number),
        roles: expect.any(String),
        stripeCustomerId: expect.any(String),
      };

      const myReq = {
        ...req,
        user: {
          ...reqUser,
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          birthdate: expect.any(String),
          picture: expect.any(String),
          password: 'google user',
        },
      };
      const createUser = {
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        birthdate: expect.any(String),
        password: 'google user',
      };
      const image = myReq.user.picture;
      const payload = {
        email: expect.any(String),
        id: expect.any(Number),
        roles: expect.any(String),
        stripeCustomerId: expect.any(String),
      };
      jest
        .spyOn(userService, 'getUserByEmail')
        .mockImplementation(async () => reqUser);

      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(async () => payloadUser);

      jest.spyOn(jwtService, 'sign').mockImplementation(() => token);

      expect(await authService.googleLogin(myReq)).toEqual({ token: token });

      expect(userService.getUserByEmail).toBeCalledWith(myReq.user.email);
      expect(userService.createUser).toBeCalledWith(createUser, image);
      expect(jwtService.sign).toBeCalledWith(payload);
    });
    // it('Should login', async () => {
    //   let promiseUser: Promise<Users>
    //   let newPromiseUSer = {
    //     ...promiseUser,
    //     email: expect.any(String),
    //     id: expect.any(Number),
    //     roles: expect.any(String),
    //     stripeCustomerId: expect.any(String),
    //     password: expect.any(String)
    //   }
    //   let promiseBoolean: Promise<Users>
    //   let token = expect.any(String)
    //   let userLogin = {
    //     email: expect.any(String),
    //     password: expect.any(String)
    //   }

    //   jest
    //     .spyOn(userService, 'getUserByEmail')
    //     .mockImplementation(async () => newPromiseUSer);

    //   jest
    //     .spyOn(bcrypt, 'compare')
    //     .mockImplementation(async () => promiseBoolean);

    //   jest
    //     .spyOn(jwtService, 'sign')
    //     .mockImplementation(() => token);

    //     expect(await authService.login(userLogin))
    //       .toEqual({token: token})

    //     expect(userService.getUserByEmail).toBeCalledWith(userLogin.email);
    //     expect(bcrypt.compare).toBeCalledWith(userLogin.password, newPromiseUSer.password);
    //     expect(jwtService.sign).toBeCalledWith(newPromiseUSer);
    // })
  });
});

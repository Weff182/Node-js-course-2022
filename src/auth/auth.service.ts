import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Users } from '../users/users.model';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const userInBase = await this.userService.getUserByEmail(req.user.email);
    if (userInBase) {
      return this.generateToken(userInBase);
    } else {
      const userDto = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        birthdate: req.user.birthdate,
      };
      const image = req.user.picture;
      const newUser = { ...userDto, password: 'google user' };
      const user = await this.userService.createUser(newUser, image);
      const token = this.generateToken(user);
      return token;
    }
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: RegisterUserDto, image: any) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const newUser = { ...userDto, password: hashPassword };
    const user = await this.userService.createUser(newUser, image);
    return this.generateToken(user);
  }

  private async generateToken(user: Users) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
      stripeCustomerId: user.stripeCustomerId,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Некоректный email',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некоректный пароль',
      });
    }
    return user;
  }
}

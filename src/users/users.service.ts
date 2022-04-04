import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//services & repositoryes
import { FilesService } from '../files/files.service';
import { StripeService } from '../stripe/stripe.service';
import { RolesService } from '../roles/roles.service';
import { UserssRepository } from './users.repository';
import { UsersRolesRepository } from '../roles/user-roles/user-roles.repository';
import { UsersBansRepository } from './user-bans/user-ban.repository';
//dto
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//other
import { Request } from 'express';
//models
import { Users } from './users.model';
import { JwtDecode } from '../auth/jwt-decode';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserssRepository,
    private userBansRepository: UsersBansRepository,
    private userRolesRepository: UsersRolesRepository,
    private roleService: RolesService,
    private jwtDecode: JwtDecode,
    private fileService: FilesService,
    private stripeService: StripeService,
  ) {}

  async createUser(dto: CreateUserDto, image: any): Promise<Users> {
    const stripeCustomer = await this.stripeService.createCustomer(
      dto.firstName,
      dto.email,
    );
    let fileName = image;
    if (typeof image !== 'string') {
      fileName = await this.fileService.createFile(image);
    }
    const newUser = { ...dto, avatar: fileName };
    const user = await this.usersRepository.createUserInDb(
      newUser,
      stripeCustomer.id,
    );
    let role = await this.roleService.getRoleByValue('USER');
    if (user.email === 'Leverx@leverx.com') {
      role = await this.roleService.getRoleByValue('ADMIN');
    }
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUserProfile(req: Request): Promise<Users> {
    const decodedUser = await this.jwtDecode.decodeJwtToken(req);
    return this.usersRepository.getUserProfile(decodedUser.id);
  }

  async updateProfile(
    dto: UpdateUserDto,
    req: Request,
    image: any,
  ): Promise<void> {
    const decodedUser = await this.jwtDecode.decodeJwtToken(req);
    console.log(decodedUser);
    const fileName = await this.fileService.createFile(image);
    const newUserINfo = { ...dto, avatar: fileName };
    console.log(newUserINfo);
    await this.usersRepository.updateProfile(newUserINfo, decodedUser.id);
    return;
  }

  async getAllUsers(): Promise<Users[]> {
    return await this.usersRepository.getAllUsers();
  }

  async addRole(dto: AddRoleDto): Promise<void> {
    const { userId } = dto;
    const user = await this.usersRepository.findUser(userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await this.userRolesRepository.createUserRole(userId, role.id);
      return;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async banUser(dto: BanUserDto): Promise<void> {
    const user = await this.usersRepository.findUser(dto.userId);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    await this.userBansRepository.createUser(dto);
    return;
  }

  async deleteUser(id: number) {
    await this.usersRepository.deleteUser(id);
    return;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }
}

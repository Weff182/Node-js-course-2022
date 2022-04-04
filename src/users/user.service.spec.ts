//import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from '../files/files.service';
//import { StripeService } from '../stripe/stripe.service';
import { RolesService } from '../roles/roles.service';
import { UsersService } from './users.service';
import { UsersBansRepository } from './user-bans/user-ban.repository';
import { UserssRepository } from './users.repository';
import { UsersRolesRepository } from '../roles/user-roles/user-roles.repository';

import { Users } from './users.model';
import { Role } from '../roles/roles.model';
//import { UserRoles } from '../roles/user-roles/user-roles.model';

//import { CreateUserInDbDto } from './dto/create-user-in-db.dto';
import { UpdateUserDto } from './dto/update-user.dto';

////import Stripe from 'stripe';
import { AppModule } from '../app.module';
import { Request } from 'express';
import { JwtDecode } from '../auth/jwt-decode';

describe('UsersService', () => {
  let usersService: UsersService;
  let roleService: RolesService;
  let fileService: FilesService;
  //let stripeService: StripeService;
  let usersRepository: UserssRepository;
  let userRolesRepository: UsersRolesRepository;
  let userBansRepository: UsersBansRepository;
  let jwtDecode: JwtDecode;
  let req: Request;
  let empty: Promise<void>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    roleService = module.get<RolesService>(RolesService);
    fileService = module.get<FilesService>(FilesService);
    // stripeService = module.get<StripeService>(StripeService);
    usersRepository = module.get<UserssRepository>(UserssRepository);
    userRolesRepository =
      module.get<UsersRolesRepository>(UsersRolesRepository);
    userBansRepository = module.get<UsersBansRepository>(UsersBansRepository);
    jwtDecode = module.get<JwtDecode>(JwtDecode);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('UsersService', () => {
    it('Should create user', async () => {
      // let streipeCostomer: Stripe.Response<Stripe.Customer>
      // let newStreipeCostomer = {
      //   ...streipeCostomer,
      //   id: expect.any(String)
      // }
      // let createUserInDbDto: CreateUserInDbDto
      // let PromiseUser: Promise<Users>
      // let PromiseRole: Promise<Role>
      // let user: Users
      // let firstName = expect.any(String)
      // let email = expect.any(String)
      // let createUser = {
      //   "email": expect.any(String),
      //   "password": expect.any(String),
      //   "firstName": expect.any(String),
      //   "lastName": expect.any(String),
      //   "birthdate": expect.any(Date)
      // }
      // const roleName = expect.any(String);
      // let image = '182img';
      //   jest
      //     .spyOn(stripeService, 'createCustomer')
      //     .mockImplementation(async () => newStreipeCostomer);
      //   jest
      //     .spyOn(usersRepository, 'createUserInDb')
      //     .mockImplementation(async () => PromiseUser);
      //   jest
      //     .spyOn(roleService, 'getRoleByValue')
      //     .mockImplementation(async () => PromiseRole)
      //   expect(await usersService.createUser(createUser, image))
      //       .toEqual(user)
      //   expect(stripeService.createCustomer).toBeCalledWith(firstName, email);
      //   expect(usersRepository.createUserInDb).toBeCalledWith(createUserInDbDto,
      //     streipeCostomer.id);
      //   expect(roleService.getRoleByValue).toBeCalledWith(roleName)
    });

    it('Should get user profile', async () => {
      const decodedUser = {
        id: '1',
      };
      let user: Users;
      jest
        .spyOn(jwtDecode, 'decodeJwtToken')
        .mockImplementation(async () => decodedUser);

      jest
        .spyOn(usersRepository, 'getUserProfile')
        .mockImplementation(async () => user);

      expect(await usersService.getUserProfile(req)).toEqual(empty);

      expect(jwtDecode.decodeJwtToken).toBeCalledWith(req);
      expect(usersRepository.getUserProfile).toBeCalledWith(decodedUser.id);
    });
    it('Should update user profile', async () => {
      let user: Users;
      const decodedUser = {
        id: expect.any(String),
      };
      const image = expect.any(String);
      const fileName = expect.any(String);
      let dto: UpdateUserDto;
      const userupdateOnDb = {
        ...dto,
        avatar: fileName,
      };
      jest
        .spyOn(jwtDecode, 'decodeJwtToken')
        .mockImplementation(async () => decodedUser);

      jest
        .spyOn(fileService, 'createFile')
        .mockImplementation(async () => fileName);

      jest
        .spyOn(usersRepository, 'updateProfile')
        .mockImplementation(async () => empty);

      expect(await usersService.updateProfile(dto, req, image)).toEqual(user);
      expect(jwtDecode.decodeJwtToken).toBeCalledWith(req);
      expect(fileService.createFile).toBeCalledWith(image);
      expect(usersRepository.updateProfile).toBeCalledWith(
        userupdateOnDb,
        decodedUser.id,
      );
    });
    it('Should add user role', async () => {
      const addRoleDto = {
        value: 'USER',
        userId: 1,
      };

      let user: Promise<Users>;
      const newuser = {
        ...user,
        id: expect.any(Number),
      };

      let role: Promise<Role>;
      const newrole = {
        ...role,
        value: expect.any(String),
        id: expect.any(Number),
      };

      jest
        .spyOn(usersRepository, 'findUser')
        .mockImplementation(async () => newuser);

      jest
        .spyOn(roleService, 'getRoleByValue')
        .mockImplementation(async () => newrole);

      jest
        .spyOn(userRolesRepository, 'createUserRole')
        .mockImplementation(async () => empty);

      expect(await usersService.addRole(addRoleDto)).toEqual(empty);

      expect(usersRepository.findUser).toBeCalledWith(addRoleDto.userId);
      expect(roleService.getRoleByValue).toBeCalledWith(addRoleDto.value);
      expect(userRolesRepository.createUserRole).toBeCalledWith(
        addRoleDto.userId,
        newrole.id,
      );
    });
    it('Should add user role error', async () => {
      // const addRoleDto = {
      //   value: 'USER',
      //   userId: 1
      // }
      // let user: Promise<UserRoles>
      // let role: Promise<Role>
      // const err = 'Пользователь или роль не найдены'
      // jest
      //   .spyOn(userRolesRepository, 'findUser')
      //   .mockImplementation(async () => user)
      // jest
      //   .spyOn(roleService, 'getRoleByValue')
      //   .mockImplementation(async () => role)
      //   expect(await usersService.addRole(addRoleDto)).toThrowError(new HttpException(err, HttpStatus.NOT_FOUND))
      //   expect(userRolesRepository.findUser).toBeCalledWith(addRoleDto.userId);
      //   expect(roleService.getRoleByValue).toBeCalledWith(addRoleDto.value);
    });
    it('Should get all Users', async () => {
      let user: Users;
      jest
        .spyOn(usersRepository, 'getAllUsers')
        .mockImplementation(async () => [user]);

      expect(await usersService.getAllUsers()).toEqual([user]);

      expect(usersRepository.getAllUsers).toBeCalled();
    });
    it('Should ban User', async () => {
      let user: Promise<Users>;
      const newUser = {
        ...user,
        id: expect.any(Number),
      };
      const dto = {
        userId: 1,
        banReason: 'for what',
      };

      jest
        .spyOn(usersRepository, 'findUser')
        .mockImplementation(async () => newUser);

      jest
        .spyOn(userBansRepository, 'createUser')
        .mockImplementation(async () => empty);

      expect(await usersService.banUser(dto)).toEqual(empty);
      expect(usersRepository.findUser).toBeCalledWith(dto.userId);
      expect(userBansRepository.createUser).toBeCalledWith(dto);
    });
    it('Should delete User', async () => {
      const id = expect.any(Number);
      jest
        .spyOn(usersRepository, 'deleteUser')
        .mockImplementation(async () => empty);

      expect(await usersService.deleteUser(id)).toEqual(empty);
      expect(usersRepository.deleteUser).toBeCalledWith(id);
    });
    it('Should get User By Email', async () => {
      let user: Promise<Users>;
      const email = expect.any(String);
      jest
        .spyOn(usersRepository, 'getUserByEmail')
        .mockImplementation(async () => user);

      expect(await usersService.getUserByEmail(email)).toEqual(user);
      expect(usersRepository.getUserByEmail).toBeCalledWith(email);
    });
  });
});

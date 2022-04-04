import { Test } from '@nestjs/testing';
import { CanActivate } from '@nestjs/common';

import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Request } from 'express';

describe('UsersController', () => {
  let usersController: UsersController;

  const requestMock = {
    token: '12max345',
  } as unknown as Request;

  const mockUsersService = {
    getUserProfile: jest.fn(() => {
      return {
        email: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        birthDate: expect.any(String),
        avatar: expect.any(String),
      };
    }),
    updateProfile: jest.fn(() => {
      return;
    }),
    getAllUsers: jest.fn(() => {
      return [
        {
          email: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          birthDate: expect.any(String),
          avatar: expect.any(String),
          vinyls: expect.any(Array),
          reviews: expect.any(Array),
        },
      ];
    }),
    addRole: jest.fn(() => {
      return;
    }),
    banUser: jest.fn(() => {
      return;
    }),
    deleteUser: jest.fn(() => {
      return;
    }),
  };
  const mockRoleAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };
  const mockJwtAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideGuard(RolesGuard)
      .useValue(mockRoleAuthGuard)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should see my profile', () => {
    const dto = {
      email: 'example@gmail.com',
      firstName: 'LeverX',
      lastName: 'LeverX',
      birthDate: '2000-12-12',
      avatar: 'avatar',
    };

    expect(usersController.seeProfile(requestMock)).toEqual(dto);
    expect(mockUsersService.getUserProfile).toHaveBeenCalledWith(requestMock);
  });

  it('should update my profile', () => {
    const updatedto = {
      birthdate: new Date('2000-12-12'),
      firstName: 'LeverrX',
      lastName: 'LeverX',
    };
    const image = 'image';

    expect(usersController.updateProfile(updatedto, image, requestMock));
    expect(mockUsersService.updateProfile).toHaveBeenCalledWith(
      updatedto,
      requestMock,
      image,
    );
  });

  it('should get all users', () => {
    const dto = {
      email: 'example@gmail.com',
      firstName: 'LeverX',
      lastName: 'LeverX',
      birthDate: '2000-12-12',
      avatar: 'avatar',
      vinyls: [],
      reviews: [],
    };

    expect(usersController.getAllUsers()).toEqual([dto]);
    expect(mockUsersService.getAllUsers).toHaveBeenCalledWith();
  });

  it('should give user role', () => {
    const giveRoledto = {
      value: 'ADMINw',
      userId: 1,
    };

    expect(usersController.addUserRole(giveRoledto));
    expect(mockUsersService.addRole).toHaveBeenCalledWith(giveRoledto);
  });

  it('should ban user', () => {
    const banUserdto = {
      userId: 1,
      banReason: 'for what',
    };

    expect(usersController.banUser(banUserdto));
    expect(mockUsersService.banUser).toHaveBeenCalledWith(banUserdto);
  });

  it('should delete user', () => {
    let id: number;

    expect(usersController.deleteUser(id));
    expect(mockUsersService.deleteUser).toHaveBeenCalledWith(id);
  });
});

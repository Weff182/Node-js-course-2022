import { Test } from '@nestjs/testing';
import { CanActivate } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

describe('RoleController', () => {
  let rolesController: RolesController;
  let empty: Promise<void>;

  const mockRoleService = {
    createRole: jest.fn(() => {
      return;
    }),
  };
  const mockRoleAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [RolesController],
      providers: [RolesService],
    })
      .overrideProvider(RolesService)
      .useValue(mockRoleService)
      .overrideGuard(RolesGuard)
      .useValue(mockRoleAuthGuard)
      .compile();

    rolesController = moduleRef.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(rolesController).toBeDefined();
  });
  describe('RoleController', () => {
    it('should create new Role', () => {
      let dto: CreateRoleDto;
      expect(rolesController.create(dto)).toEqual(empty);
      expect(mockRoleService.createRole).toHaveBeenCalledWith(dto);
    });
  });
});

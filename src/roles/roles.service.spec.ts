import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

describe('RoleService', () => {
  let roleService: RolesService;
  let roleRepository: RolesRepository;
  let empty: Promise<void>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    roleService = module.get<RolesService>(RolesService);
    roleRepository = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(roleService).toBeDefined();
  });

  describe('RoleService', () => {
    it('Should create new Role', async () => {
      let dto: CreateRoleDto;
      jest
        .spyOn(roleRepository, 'create')
        .mockImplementation(async () => empty);

      expect(await roleService.createRole(dto)).toEqual(empty);

      expect(roleRepository.create).toBeCalledWith(dto);
    });
    //нужно сделать тете на ошибку
    it('Should get Role By Value', async () => {
      const value = expect.any(String);
      let role: Promise<Role>;
      const newRole = {
        ...role,
        value: expect.any(String),
      };
      jest
        .spyOn(roleRepository, 'getRoleByValue')
        .mockImplementation(async () => newRole);

      expect(await roleService.getRoleByValue(value)).toEqual(newRole);

      expect(roleRepository.getRoleByValue).toBeCalledWith(value);
    });
    it('Should create start roles', async () => {
      jest
        .spyOn(roleRepository, 'createStartRole')
        .mockImplementation(async () => empty);

      expect(await roleService.createStartRole()).toEqual(empty);

      expect(roleRepository.createStartRole).toBeCalled();
    });
  });
});

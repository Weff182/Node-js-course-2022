import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { RolesService } from './roles/roles.service';
import { VinylService } from './vinyls/vinyl.service';

describe('AppService', () => {
  let appService: AppService;
  let vinylService: VinylService;
  let roleService: RolesService;
  let empty: Promise<void>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    appService = module.get<AppService>(AppService);
    vinylService = module.get<VinylService>(VinylService);
    roleService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('AppService', () => {
    it('Should get Start Function', async () => {
      jest
        .spyOn(vinylService, 'createStartVinyls')
        .mockImplementation(async () => empty);

      jest
        .spyOn(roleService, 'createStartRole')
        .mockImplementation(async () => empty);

      expect(await appService.getStartFunction()).toEqual(empty);

      expect(vinylService.createStartVinyls).toBeCalled();
      expect(roleService.createStartRole).toBeCalled();
    });
  });
});

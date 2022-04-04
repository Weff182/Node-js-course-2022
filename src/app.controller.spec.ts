import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let empty: Promise<void>;
  const mockVinylsService = {
    getStartFunction: jest.fn(() => {
      return;
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(mockVinylsService)
      .compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
  describe('AppController', () => {
    it('should use start functionality', () => {
      expect(appController.createStartFunctionality()).toEqual(empty);
      expect(mockVinylsService.getStartFunction).toHaveBeenCalled();
    });
  });
});

import { Test } from '@nestjs/testing';
import { CanActivate } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VinylsController } from './vinyl.controller';
import { VinylService } from './vinyl.service';
import { Request } from 'express';
import { Vinyls } from './vinyl.model';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetVynilByIdDto } from './dto/get-vinylbyId.dto';

describe('VinylsController', () => {
  let vinylsController: VinylsController;
  let empty: Promise<void>;
  let vinils: Vinyls;

  const requestMock = {
    token: expect.any(String),
  } as unknown as Request;

  const mockVinylsService = {
    create: jest.fn(() => {
      return;
    }),
    getVinyls: jest.fn(() => {
      [vinils];
    }),
    addReview: jest.fn(() => {
      return;
    }),
    buyVinyls: jest.fn(() => {
      return;
    }),
    getVinylByName: jest.fn(() => vinils),
    getSortVinyls: jest.fn(() => {
      [vinils];
    }),
  };
  const mockRoleAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };
  const mockJwtAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [VinylsController],
      providers: [VinylService],
    })
      .overrideProvider(VinylService)
      .useValue(mockVinylsService)
      .overrideGuard(RolesGuard)
      .useValue(mockRoleAuthGuard)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    vinylsController = moduleRef.get<VinylsController>(VinylsController);
  });

  it('should be defined', () => {
    expect(vinylsController).toBeDefined();
  });
  describe('VinylsController', () => {
    it('should create vinyl', () => {
      let dto: CreateVinylDto;
      const image = expect.any(String);
      expect(vinylsController.createVinyl(dto, image)).toEqual(empty);
      expect(mockVinylsService.create).toHaveBeenCalledWith(dto, image);
    });

    it('should get all vinyls', () => {
      let vinils: Vinyls[];
      expect(vinylsController.getVinyls()).toEqual(vinils);
      expect(mockVinylsService.getVinyls).toHaveBeenCalled();
    });

    it('should create review', () => {
      let description: CreateReviewDto;
      const id = expect.any(Number);
      expect(
        vinylsController.createReview(id, description, requestMock),
      ).toEqual(empty);
      expect(mockVinylsService.addReview).toHaveBeenCalledWith(
        description,
        requestMock,
        id,
      );
    });

    it('should buy vinyl', () => {
      const id = expect.any(Number);
      expect(vinylsController.buyVinyls(id, requestMock)).toEqual(empty);
      expect(mockVinylsService.buyVinyls).toHaveBeenCalledWith(requestMock, id);
    });

    it('should find vinyl by name and author', () => {
      let searchObject: GetVynilByIdDto;
      let vinils: Vinyls;
      expect(vinylsController.getVinylByName(searchObject)).toEqual(vinils);
      expect(mockVinylsService.getVinylByName).toHaveBeenCalledWith(
        searchObject,
      );
    });

    it('should find vinyl by name and author', () => {
      let searchObject: GetVynilByIdDto;
      let vinils: Vinyls;
      expect(vinylsController.getVinylByName(searchObject)).toEqual(vinils);
      expect(mockVinylsService.getVinylByName).toHaveBeenCalledWith(
        searchObject,
      );
    });

    it('should get sort vinyls', () => {
      let vinils: Vinyls[];
      expect(vinylsController.getSortVinyls()).toEqual(vinils);
      expect(mockVinylsService.getSortVinyls).toHaveBeenCalled();
    });
  });
});

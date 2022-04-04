import { Test, TestingModule } from '@nestjs/testing';
//services and repository
import { FilesService } from '../files/files.service';
import { VinylService } from './vinyl.service';
import { ReviewsService } from '../reviews/reviews.service';
import { VinylesRepository } from './vinyl.repository';
import { UserVynilsRepository } from './vynil-user/vinyl-user.repository';
//model
import { Vinyls } from './vinyl.model';
//dto
import { GetVynilByIdDto } from './dto/get-vinylbyId.dto';
import { CreateReviewDto } from './dto/create-review.dto';
//other

import { AppModule } from '../app.module';
import { Request } from 'express';
import { JwtDecode } from '../auth/jwt-decode';

describe('VinylsService', () => {
  let vinylService: VinylService;
  let vinylRepository: VinylesRepository;
  let userVinylRepository: UserVynilsRepository;
  let fileService: FilesService;
  let reviewService: ReviewsService;
  let jwtDecode: JwtDecode;
  let req: Request;
  let empty: Promise<void>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    vinylService = module.get<VinylService>(VinylService);
    vinylRepository = module.get<VinylesRepository>(VinylesRepository);
    userVinylRepository =
      module.get<UserVynilsRepository>(UserVynilsRepository);
    fileService = module.get<FilesService>(FilesService);
    reviewService = module.get<ReviewsService>(ReviewsService);
    jwtDecode = module.get<JwtDecode>(JwtDecode);
  });

  it('should be defined', () => {
    expect(vinylService).toBeDefined();
  });

  describe('VinylsService', () => {
    it('Should create vinyl', async () => {
      const fileName = '182';
      const dto = {
        name: expect.any(String),
        author: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
      };
      const DtoOnDB = {
        ...dto,
        image: fileName,
      };
      jest
        .spyOn(fileService, 'createFile')
        .mockImplementation(async () => fileName);

      jest
        .spyOn(vinylRepository, 'create')
        .mockImplementation(async () => empty);

      expect(await vinylService.create(dto, fileName)).toEqual(empty);

      expect(fileService.createFile).toBeCalledWith(fileName);
      expect(vinylRepository.create).toBeCalledWith(DtoOnDB);
    });
    it('Should get Vynils', async () => {
      let vinylsArray: Vinyls[];
      jest
        .spyOn(vinylRepository, 'getVinyls')
        .mockImplementation(async () => vinylsArray);

      expect(await vinylService.getVinyls()).toEqual(vinylsArray);

      expect(vinylRepository.getVinyls).toBeCalled();
    });
    it('Should add review', async () => {
      let description: CreateReviewDto;
      const id = expect.any(Number);
      jest
        .spyOn(reviewService, 'addReview')
        .mockImplementation(async () => empty);

      expect(await vinylService.addReview(description, req, id)).toEqual(empty);

      expect(reviewService.addReview).toBeCalledWith(description, req, id);
    });
    it('Should get Vinyl By name and author', async () => {
      let searchObject: GetVynilByIdDto;
      let vinyl: Vinyls;
      jest
        .spyOn(vinylRepository, 'getVinylByName')
        .mockImplementation(async () => vinyl);

      expect(await vinylService.getVinylByName(searchObject)).toEqual(vinyl);

      expect(vinylRepository.getVinylByName).toBeCalledWith(searchObject);
    });
    it('Should buy vinyl', async () => {
      const id = expect.any(Number);
      const decodedUser = {
        id: expect.any(String),
      };
      jest
        .spyOn(jwtDecode, 'decodeJwtToken')
        .mockImplementation(async () => decodedUser);
      jest
        .spyOn(userVinylRepository, 'createUserVinyl')
        .mockImplementation(async () => empty);

      expect(await vinylService.buyVinyls(req, id)).toEqual(empty);

      expect(jwtDecode.decodeJwtToken).toBeCalledWith(req);
      expect(userVinylRepository.createUserVinyl).toBeCalledWith(
        decodedUser.id,
        id,
      );
    });
    it('Should get sort vinyls', async () => {
      let vinylsArray: Vinyls[];
      jest
        .spyOn(vinylRepository, 'getSortVinyls')
        .mockImplementation(async () => vinylsArray);

      expect(await vinylService.getSortVinyls()).toEqual(vinylsArray);

      expect(vinylRepository.getSortVinyls).toBeCalled();
    });
    it('Should create Start Vinyls', async () => {
      jest
        .spyOn(vinylRepository, 'createStartVinyls')
        .mockImplementation(async () => empty);

      expect(await vinylService.createStartVinyls()).toEqual(empty);

      expect(vinylRepository.createStartVinyls).toBeCalled();
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ReviewsService } from './reviews.service';
import { ReviewRepository } from './reviews.repository';
import { JwtDecode } from '../auth/jwt-decode';
import { Request } from 'express';

describe('Review Service', () => {
  let reviewService: ReviewsService;
  let reviewRepository: ReviewRepository;
  let jwtDecode: JwtDecode;
  let empty: Promise<void>;
  let req: Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    reviewService = module.get<ReviewsService>(ReviewsService);
    reviewRepository = module.get<ReviewRepository>(ReviewRepository);
    jwtDecode = module.get<JwtDecode>(JwtDecode);
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });

  describe('Review Service', () => {
    it('Should create new Role', async () => {
      const decodedUser = {
        id: expect.any(Number),
      };
      const description = {
        description: expect.any(String),
      };
      const id = expect.any(Number);
      const newReview = {
        description: expect.any(String),
        vinylId: expect.any(Number),
        userId: expect.any(Number),
      };
      jest
        .spyOn(jwtDecode, 'decodeJwtToken')
        .mockImplementation(async () => decodedUser);

      jest
        .spyOn(reviewRepository, 'create')
        .mockImplementation(async () => empty);

      expect(await reviewService.addReview(description, req, id)).toEqual(
        empty,
      );

      expect(jwtDecode.decodeJwtToken).toBeCalledWith(req);
      expect(reviewRepository.create).toBeCalledWith(newReview);
    });
  });
});

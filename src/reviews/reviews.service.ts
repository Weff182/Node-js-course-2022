import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateReviewDto } from '../vinyls/dto/create-review.dto';
import { ReviewRepository } from './reviews.repository';
import { JwtDecode } from '../auth/jwt-decode';

@Injectable()
export class ReviewsService {
  constructor(
    private reviewRepository: ReviewRepository,
    private jwtDecode: JwtDecode,
  ) {}

  async addReview(
    description: CreateReviewDto,
    req: Request,
    id: number,
  ): Promise<void> {
    const decodedUser = await this.jwtDecode.decodeJwtToken(req);
    const newReview = {
      description: description.description,
      vinylId: id,
      userId: decodedUser.id,
    };
    await this.reviewRepository.create(newReview);
    return;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//models
import { Reviews } from '../reviews/reviews.model';
//DTO
import { CreateReviewInDBDto } from './dto/create-review-in-db.dto';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Reviews) private reviewsRepository: typeof Reviews,
  ) {}

  async create(dto: CreateReviewInDBDto): Promise<void> {
    await this.reviewsRepository.create(dto);
  }
}

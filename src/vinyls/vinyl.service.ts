import { Injectable } from '@nestjs/common';
import { Request } from 'express';
//services and repository
import { VinylesRepository } from './vinyl.repository';
import { UserVynilsRepository } from './vynil-user/vinyl-user.repository';
import { FilesService } from '../files/files.service';
import { ReviewsService } from '../reviews/reviews.service';

//dto
import { CreateReviewDto } from './dto/create-review.dto';
import { GetVynilByIdDto } from './dto/get-vinylbyId.dto';
import { CreateVinylDto } from './dto/create-vinyl.dto';
//models
import { Vinyls } from './vinyl.model';
import { JwtDecode } from '../auth/jwt-decode';

@Injectable()
export class VinylService {
  constructor(
    private vinylRepository: VinylesRepository,
    private userVinylRepository: UserVynilsRepository,
    private reviewService: ReviewsService,
    private fileService: FilesService,
    private jwtDecode: JwtDecode,
  ) {}

  async create(dto: CreateVinylDto, image: any): Promise<void> {
    const fileName = await this.fileService.createFile(image);
    const newDto = {
      name: dto.name,
      author: dto.author,
      description: dto.description,
      price: Number(dto.price),
    };
    const vinlyToDb = {
      ...newDto,
      image: fileName,
    };
    await this.vinylRepository.create(vinlyToDb);
    return;
  }

  async getVinyls(): Promise<Vinyls[]> {
    return await this.vinylRepository.getVinyls();
  }

  async addReview(
    description: CreateReviewDto,
    req: Request,
    id: number,
  ): Promise<void> {
    await this.reviewService.addReview(description, req, id);
    return;
  }

  async getVinylByName(searchObject: GetVynilByIdDto): Promise<Vinyls> {
    return await this.vinylRepository.getVinylByName(searchObject);
  }

  async buyVinyls(req: Request, id: number): Promise<void> {
    const decodedUser = await this.jwtDecode.decodeJwtToken(req);
    await this.userVinylRepository.createUserVinyl(decodedUser.id, id);
  }

  async getSortVinyls(): Promise<Vinyls[]> {
    return await this.vinylRepository.getSortVinyls();
  }

  async createStartVinyls(): Promise<void> {
    await this.vinylRepository.createStartVinyls();
  }
}

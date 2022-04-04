import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//models
import { Vinyls } from './vinyl.model';
import { Reviews } from '../reviews/reviews.model';
//DTO
import { GetVynilByIdDto } from './dto/get-vinylbyId.dto';
import { CreateVinylInDBDto } from './dto/create-vinyl-in-DB.dto';
//other
import sequelize from 'sequelize';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class VinylesRepository {
  constructor(
    @InjectModel(Vinyls) private vinylsRepository: typeof Vinyls,
    private httpService: HttpService,
  ) {}

  async create(dto: CreateVinylInDBDto): Promise<void> {
    await this.vinylsRepository.create(dto);
    return;
  }

  async getVinyls(): Promise<Vinyls[]> {
    const userAttributes = ['name', 'author', 'description', 'price'];
    const reviewAttributes = ['description', 'userId', 'createdAt'];
    const vynils = await this.vinylsRepository.findAll({
      attributes: userAttributes,
      include: [
        {
          model: Reviews,
          attributes: reviewAttributes,
        },
      ],
    });
    if (!vynils) {
      throw new HttpException('Винил не найден', HttpStatus.NOT_FOUND);
    }
    return vynils;
  }

  async getVinylByName(searchObject: GetVynilByIdDto): Promise<Vinyls> {
    const userAttributes = ['name', 'author', 'description', 'price'];
    const reviewAttributes = ['description', 'userId', 'createdAt'];
    const vynils = await this.vinylsRepository.findOne({
      where: { name: searchObject.name, author: searchObject.author },
      attributes: userAttributes,
      include: [
        {
          model: Reviews,
          attributes: reviewAttributes,
        },
      ],
    });
    if (!vynils) {
      throw new HttpException('Винил не найден', HttpStatus.NOT_FOUND);
    }
    return vynils;
  }

  async getSortVinyls(): Promise<Vinyls[]> {
    const sort = sequelize.literal('price');
    return await this.vinylsRepository.findAll({ order: sort });
  }

  async createStartVinyls(): Promise<void> {
    if ((await this.vinylsRepository.findAll()).length !== 0) {
      return;
    }
    const url = 'https://openwhyd.org/max/playlists/?format=json&limit=30';
    const data = await lastValueFrom(
      this.httpService.get(url).pipe(map((res) => res.data)),
    );

    for (let i = 0; i < 30; i++) {
      const newdto = {
        author: data[i].uNm,
        name: data[i].name,
        description: data[i]._id,
        price: data[i].nbP * 10,
      };
      const img = data[i].img;

      this.vinylsRepository.create({ ...newdto, image: img });
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserVinyls } from './user-vinyls.model';

@Injectable()
export class UserVynilsRepository {
  constructor(
    @InjectModel(UserVinyls) private userVinylsRepository: typeof UserVinyls,
  ) {}

  async createUserVinyl(userId: number, vinylId: number) {
    await this.userVinylsRepository.create({ userId, vinylId });
    return;
  }
}

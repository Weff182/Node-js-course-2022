import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BanUserDto } from '../dto/ban-user.dto';
import { UserBans } from './user-ban.model';

@Injectable()
export class UsersBansRepository {
  constructor(
    @InjectModel(UserBans) private userBansRepository: typeof UserBans,
  ) {}

  async createUser(dto: BanUserDto) {
    await this.userBansRepository.create(dto);
  }
}

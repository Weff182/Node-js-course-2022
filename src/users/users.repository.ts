import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//models
import { Users } from './users.model';
import { Vinyls } from '../vinyls/vinyl.model';
import { Reviews } from '../reviews/reviews.model';
//dto
import { CreateUserInDbDto } from './dto/create-user-in-db.dto';
import { UpdateUserInDto } from './dto/update-user-in-db.dto';

@Injectable()
export class UserssRepository {
  constructor(
    @InjectModel(Users) private readonly usersRepository: typeof Users,
  ) {}

  async createUserInDb(
    newUser: CreateUserInDbDto,
    stripeCustomerId: string,
  ): Promise<Users> {
    return await this.usersRepository.create({
      ...newUser,
      stripeCustomerId: stripeCustomerId,
    });
  }

  async getUserByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserProfile(userId: string): Promise<Users> {
    const userAttributes = [
      'firstName',
      'lastName',
      'email',
      'birthdate',
      'avatar',
    ];
    const reviewAttributes = ['description', 'vinylId', 'createdAt'];
    const myBoughtVinylsAttributes = ['name', 'author', 'image'];
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      attributes: userAttributes,
      include: [
        { model: Reviews, attributes: reviewAttributes },
        { model: Vinyls, attributes: myBoughtVinylsAttributes },
      ],
    });
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateProfile(dto: UpdateUserInDto, userId: string): Promise<void> {
    await this.usersRepository.update(dto, { where: { id: userId } });
    return;
  }

  async getAllUsers(): Promise<Users[]> {
    const userAttributes = [
      'firstName',
      'lastName',
      'email',
      'birthdate',
      'avatar',
    ];
    const reviewAttributes = ['description', 'vinylId', 'createdAt'];
    const myBoughtVinylsAttributes = ['name', 'author', 'image'];
    const users = await this.usersRepository.findAll({
      attributes: userAttributes,
      include: [
        { model: Reviews, attributes: reviewAttributes },
        { model: Vinyls, attributes: myBoughtVinylsAttributes },
      ],
    });
    return users;
  }

  async findUser(id: number): Promise<Users> {
    return await this.usersRepository.findByPk(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.destroy({ where: { id } });
    return;
  }
}

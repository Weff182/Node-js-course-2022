import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
//jwt func
import { AuthModule } from '../auth/auth.module';
//models
import { Vinyls } from '../vinyls/vinyl.model';
import { Users } from '../users/users.model';
import { Reviews } from './reviews.model';
//exported service
import { ReviewsService } from './reviews.service';
import { ReviewRepository } from './reviews.repository';

@Module({
  controllers: [],
  providers: [ReviewsService, ReviewRepository],
  imports: [SequelizeModule.forFeature([Reviews, Vinyls, Users]), AuthModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}

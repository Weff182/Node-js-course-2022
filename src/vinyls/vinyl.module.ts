import { Module } from '@nestjs/common';
import { Users } from '../users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { Vinyls } from './vinyl.model';
import { VinylService } from './vinyl.service';
import { VinylsController } from './vinyl.controller';
import { ReviewsModule } from '../reviews/reviews.module';
import { Reviews } from '../reviews/reviews.model';
import { UserVinyls } from './vynil-user/user-vinyls.model';
import { StripeModule } from '../stripe/stripe.module';
import { HttpModule } from '@nestjs/axios';
import { VinylesRepository } from './vinyl.repository';
import { UserVynilsRepository } from './vynil-user/vinyl-user.repository';

@Module({
  providers: [VinylService, VinylesRepository, UserVynilsRepository],
  controllers: [VinylsController],
  imports: [
    SequelizeModule.forFeature([Users, Vinyls, Reviews, UserVinyls]),
    FilesModule,
    AuthModule,
    UsersModule,
    ReviewsModule,
    StripeModule,
    HttpModule,
  ],
  exports: [VinylService],
})
export class VinylModule {}

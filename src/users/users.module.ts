import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { UserVinyls } from '../vinyls/vynil-user/user-vinyls.model';
import { Vinyls } from '../vinyls/vinyl.model';
import { Reviews } from '../reviews/reviews.model';
import { Role } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';
import { UserRoles } from '../roles/user-roles/user-roles.model';
import { StripeModule } from '../stripe/stripe.module';
import { UserBans } from './user-bans/user-ban.model';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { UserssRepository } from './users.repository';
import { UsersBansRepository } from './user-bans/user-ban.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserssRepository, UsersBansRepository],
  imports: [
    SequelizeModule.forFeature([
      Users,
      Role,
      UserRoles,
      UserBans,
      Vinyls,
      UserVinyls,
      Reviews,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
    FilesModule,
    StripeModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}

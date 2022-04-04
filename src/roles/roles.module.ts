import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
//roles func
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
//models
import { Role } from './roles.model';
import { Users } from '../users/users.model';
import { UserRoles } from './user-roles/user-roles.model';
import { UserVinyls } from '../vinyls/vynil-user/user-vinyls.model';
//moudeles
import { AuthModule } from '../auth/auth.module';
import { UsersRolesRepository } from './user-roles/user-roles.repository';
import { RolesRepository } from './roles.repository';

@Module({
  providers: [RolesService, UsersRolesRepository, RolesRepository],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, Users, UserRoles, UserVinyls]),
    AuthModule,
  ],
  exports: [RolesService, UsersRolesRepository],
})
export class RolesModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
//models
import { Users } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles/user-roles.model';
import { Vinyls } from './vinyls/vinyl.model';
import { UserVinyls } from './vinyls/vynil-user/user-vinyls.model';
import { Reviews } from './reviews/reviews.model';
//modules
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { VinylModule } from './vinyls/vinyl.module';
import { FilesModule } from './files/files.module';
import { ReviewsModule } from './reviews/reviews.module';
import { StripeModule } from './stripe/stripe.module';
//other
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserBans } from './users/user-bans/user-ban.model';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users, Role, UserRoles, Vinyls, UserVinyls, Reviews, UserBans],
      autoLoadModels: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
    }),
    UsersModule,
    RolesModule,
    VinylModule,
    FilesModule,
    ReviewsModule,
    StripeModule,
  ],
})
export class AppModule {}

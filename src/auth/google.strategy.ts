import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private httpService: HttpService) {
    super({
      clientID:
        '848771070919-jj3ljqglj0cegma02br5k86igksc1as6.apps.googleusercontent.com',
      clientSecret: process.env.CLIENT_GOOOGLE_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    const url = `https://people.googleapis.com/v1/people/me?personFields=birthdays&access_token=${user.accessToken}`;
    const birthdate = await this.getUsersBirthday(url);
    const newUser = { ...user, birthdate: birthdate };
    done(null, newUser);
  }

  async getUsersBirthday(url: string): Promise<any> {
    const data = await lastValueFrom(
      this.httpService.get(url).pipe(map((res) => res.data)),
    );
    return (
      data.birthdays[0].date.year.toString() +
      '-' +
      data.birthdays[0].date.month.toString() +
      '-' +
      data.birthdays[0].date.day.toString()
    );
  }
}

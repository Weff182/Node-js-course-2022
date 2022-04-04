import request from 'supertest';
import jwt from '../../../../node_modules/jsonwebtoken';

export default async () => {
  const responseAdmin = await request('http://localhost:5000/')
    .post('auth/registration/')
    .field('firstName', 'LeverX')
    .field('lastName', 'LeverX')
    .field('email', 'Leverx@leverx.com')
    .field('password', '12345')
    .field('birthdate', '2000-12-11')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(201);

  const tokenAdmin = responseAdmin.body.token;
  const decodeTokenAdmin = jwt.decode(tokenAdmin);

  const responseUser = await request('http://localhost:5000/')
    .post('auth/registration/')
    .field('firstName', 'LeverX')
    .field('lastName', 'LeverX')
    .field('email', 'Leverx1@leverx.com')
    .field('password', '12345')
    .field('birthdate', '2000-12-11')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(201);

  const tokenUser = responseUser.body.token;
  const decodeToken = jwt.decode(tokenUser);

  await request('http://localhost:5000/')
    .post('users/ban')
    .auth(tokenAdmin, { type: 'bearer' })
    .send({
      userId: decodeToken.id,
      banReason: 'for insults',
    })
    .expect(201);

  await request('http://localhost:5000/users/')
    .delete(decodeToken.id.toString())
    .auth(tokenAdmin, { type: 'bearer' })
    .expect(200);

  await request('http://localhost:5000/users/')
    .delete(decodeTokenAdmin.id.toString())
    .auth(tokenAdmin, { type: 'bearer' })
    .expect(200);
};

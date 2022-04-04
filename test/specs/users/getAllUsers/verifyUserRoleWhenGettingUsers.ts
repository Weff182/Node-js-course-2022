import request from 'supertest';
import jwt from '../../../../node_modules/jsonwebtoken';

export default async () => {
  const userResponse = await request('http://localhost:5000/')
    .post('auth/registration/')
    .field('firstName', 'LeverX')
    .field('lastName', 'LeverX')
    .field('email', 'Leverx1@leverx.com')
    .field('password', '12345')
    .field('birthdate', '2000-12-11')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(201);

  let token = userResponse.body.token;
  const decodeToken = jwt.decode(token);

  await request('http://localhost:5000/')
    .get('users/')
    .auth(token, { type: 'bearer' })
    .expect(403);

  const response = await request('http://localhost:5000/')
    .post('auth/registration/')
    .field('firstName', 'LeverX')
    .field('lastName', 'LeverX')
    .field('email', 'Leverx@leverx.com')
    .field('password', '12345')
    .field('birthdate', '2000-12-11')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(201);

  token = response.body.token;
  const decodeTokenAdmin = jwt.decode(token);

  await request('http://localhost:5000/users/')
    .delete(decodeTokenAdmin.id.toString())
    .auth(token, { type: 'bearer' })
    .expect(200);

  await request('http://localhost:5000/users/')
    .delete(decodeToken.id.toString())
    .auth(token, { type: 'bearer' })
    .expect(200);
};

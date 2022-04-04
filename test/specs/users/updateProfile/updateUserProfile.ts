import request from 'supertest';
import jwt from '../../../../node_modules/jsonwebtoken';

export default async () => {
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

  const token = response.body.token;
  const decodeToken = jwt.decode(token);

  console.log(decodeToken);

  await request('http://localhost:5000/users/')
    .patch('profile/')
    .auth(token, { type: 'bearer' })
    .field('firstName', 'New LeverX')
    .field('lastName', 'New LeverX')
    .field('birthdate', '1999-12-11')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(200);

  const { body } = await request('http://localhost:5000/users/')
    .get('profile/')
    .auth(token, { type: 'bearer' })
    .expect(200);

  expect(body).toHaveProperty('firstName', 'New LeverX');
  expect(body).toHaveProperty('lastName', 'New LeverX');
  expect(body).toHaveProperty('birthdate', '1999-12-11T00:00:00.000Z');
  expect(body).toHaveProperty('email');
  expect(body).toHaveProperty('avatar');
  expect(body).toHaveProperty('vinyls');
  expect(body).toHaveProperty('reviews');
  expect(body).not.toHaveProperty('id');
  expect(body).not.toHaveProperty('password');

  await request('http://localhost:5000/users/')
    .delete(decodeToken.id.toString())
    .auth(token, { type: 'bearer' })
    .expect(200);
};

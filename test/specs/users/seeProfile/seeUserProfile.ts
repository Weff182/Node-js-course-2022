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

  const decodeToken = jwt.decode(response.body.token);
  const token = response.body.token;

  const { body } = await request('http://localhost:5000/users/')
    .get('profile/')
    .auth(token, { type: 'bearer' })
    .expect(200);

  expect(body).toHaveProperty('firstName');
  expect(body).toHaveProperty('lastName');
  expect(body).toHaveProperty('email');
  expect(body).toHaveProperty('birthdate');
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

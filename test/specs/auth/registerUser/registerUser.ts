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

  expect(decodeToken).toHaveProperty('id');
  expect(decodeToken).toHaveProperty('email', 'Leverx@leverx.com');
  expect(decodeToken).toHaveProperty('stripeCustomerId');
  expect(decodeToken).not.toHaveProperty('firstName');
  expect(decodeToken).not.toHaveProperty('lastName');
  expect(decodeToken).not.toHaveProperty('password');

  await request('http://localhost:5000/users/')
    .delete(decodeToken.id.toString())
    .auth(token, { type: 'bearer' })
    .expect(200);
};

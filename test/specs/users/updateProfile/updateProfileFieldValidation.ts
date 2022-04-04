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

  await request('http://localhost:5000/users/')
    .patch('profile/')
    .auth(token, { type: 'bearer' })
    .field('firstName', 12312)
    .field('lastName', 'New LeverX')
    .field('birthdate', '1999-12-11')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(400);

  await request('http://localhost:5000/users/')
    .patch('profile/')
    .auth(token, { type: 'bearer' })
    .field('firstName', 'New LeverX')
    .field('lastName', 'New LeverX')
    .field('birthdate', 'sadasd')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(400);

  await request('http://localhost:5000/users/')
    .delete(decodeToken.id.toString())
    .auth(token, { type: 'bearer' })
    .expect(200);
};

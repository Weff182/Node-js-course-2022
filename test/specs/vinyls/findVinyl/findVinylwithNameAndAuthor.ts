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

  await request('http://localhost:5000/')
    .post('vinyls/')
    .auth(tokenAdmin, { type: 'bearer' })
    .field('name', 'LeverX vinyl')
    .field('author', 'user LeverX')
    .field('description', 'new description')
    .field('price', '1200')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(201);

  const { body } = await request('http://localhost:5000/')
    .get(`vinyls/search`)
    .send({
      name: 'LeverX vinyl',
      author: 'user LeverX',
    })
    .expect(200);

  expect(body).toHaveProperty('name');
  expect(body).toHaveProperty('author');
  expect(body).toHaveProperty('description');
  expect(body).toHaveProperty('price');
  expect(body).toHaveProperty('reviews');

  await request('http://localhost:5000/users/')
    .delete(decodeTokenAdmin.id.toString())
    .auth(tokenAdmin, { type: 'bearer' })
    .expect(200);
};
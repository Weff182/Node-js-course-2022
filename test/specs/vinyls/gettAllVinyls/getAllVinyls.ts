import request from 'supertest';

export default async () => {
  const { body } = await request('http://localhost:5000/')
    .get('vinyls/')
    .expect(200);

  expect(body[0]).not.toHaveProperty('id');
  expect(body[0]).toHaveProperty('name');
  expect(body[0]).toHaveProperty('author');
  expect(body[0]).toHaveProperty('description');
  expect(body[0]).toHaveProperty('price');
  expect(body[0]).toHaveProperty('reviews');
};

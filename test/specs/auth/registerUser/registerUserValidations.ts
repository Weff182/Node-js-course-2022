import request from 'supertest';

export default async () => {
  await request('http://localhost:5000/')
    .post('auth/registration/')
    .field('firstName', 'LeverX')
    .field('lastName', 'LeverX')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(400);

  await request('http://localhost:5000/')
    .post('auth/registration/')
    .field('firstName', 'LeverX')
    .field('lastName', 123)
    .field('email', 124)
    .field('password', '12345')
    .field('birthdate', '2000-12-11')
    .attach('image', 'test/userImg.jpg')
    .set('Content-Type', 'multipart/form-data')
    .expect(400);
};

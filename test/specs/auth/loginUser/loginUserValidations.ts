import request from 'supertest';

export default async () => {
  await request('http://localhost:5000/')
    .post('auth/login/')
    .send({
      email: 123,
      password: '12345',
    })
    .expect(400);

  await request('http://localhost:5000/')
    .post('auth/login/')
    .send({
      email: 'Leverx@leverx.com',
      password: 123,
    })
    .expect(400);
};

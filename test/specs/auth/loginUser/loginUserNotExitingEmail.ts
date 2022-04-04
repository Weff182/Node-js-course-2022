import request from 'supertest';

export default async () => {
  await request('http://localhost:5000/')
    .post('auth/login/')
    .send({
      email: 'Leverx@leverx.com',
      password: '12345',
    })
    .expect(401);
};

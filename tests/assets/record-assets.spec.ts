import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

// let token: string;

beforeAll(async () => {
  // supertest(app)
  //   .post('/v1/auth/login')
  //   .send({ username: 'stark@marvel.com', password: 'password' })
  //   .expect(200)
  //   .end((err, { body }) => {
  //     if (err) {
  //       throw err;
  //     }
  //     token = body.accessToken;
  //   });
});

describe('testing asset recording', () => {
  test('testing route', done => {
    supertest(app)
      .post('/v1/assets/record')
      // .set('Authorization', `Bearer ${token}`)
      .send({
        assets: {
          name: 'fasdf',
          category: 'fasdf',
          accessUrl: 'adsfasd',
          fileName: 'fasdf',
          fileType: 'asdf',
        },
      })
      .expect(201)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
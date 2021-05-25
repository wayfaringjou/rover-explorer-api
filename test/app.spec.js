const app = require('../src/app');

describe('App', () => {
  describe('Requests to /', () => {
    it('responds with "Hello explorer!"', (done) => {
      request(app)
        .get('/')
        .expect(200, 'Hello Explorer!', done);
    });
  });
  describe('Requests to non-existing endpoints', () => {
    it('Responds with 404 and "Not Found"', (done) => {
      request(app)
        .get('/notfound')
        .expect(404, 'Not Found', done);
    });
  });
});

const { expect } = require('chai');
const app = require('../../src/app');
/*
If request is done without sol parameter
it will return an empty array
Camera is optional */

/*
Validate queries and return errors for invalid ones
*/

describe('Rovers endpoint', () => {
  describe('GET requests to /api/rovers/:roverId', () => {
    it('Responds with info from given rover fetched from NASA', (done) => {
      request(app)
        .get('/api/rovers/curiosity')
        .expect(200)
        .then((res) => {
          expect(res.body?.rover).to.include.all.keys('id', 'name', 'landing_date', 'launch_date', 'status', 'max_sol', 'max_date', 'total_photos', 'cameras');
          done();
        })
        .catch((error) => done(error));
    });
  });
  describe('Valid GET requests to /api/rovers/photos', () => {
    it('Responds with photos from given rover and sol', (done) => {
      request(app)
        .get('/api/rovers/curiosity/photos?sol=0')
        .expect(200)
        .then((res) => {
          expect(res.body?.photos[0]).to.include.all.keys('id', 'sol', 'camera', 'img_src', 'earth_date', 'rover');
          done();
        })
        .catch((error) => done(error));
    });
    it('Responds with photos from given rover and earth_date', (done) => {
      request(app)
        .get('/api/rovers/curiosity/photos?earth_date=2012-08-06')
        .expect(200)
        .then((res) => {
          expect(res.body?.photos[0]).to.include.all.keys('id', 'sol', 'camera', 'img_src', 'earth_date', 'rover');
          done();
        })
        .catch((error) => done(error));
    });
    it('Responds with photos from given rover and camera', (done) => {
      request(app)
        .get('/api/rovers/curiosity/photos?sol=0&camera=fhaz')
        .expect(200)
        .then((res) => {
          expect(res.body?.photos[0]).to.include.all.keys('id', 'sol', 'camera', 'img_src', 'earth_date', 'rover');
          done();
        })
        .catch((error) => done(error));
    });
  });
  describe('Request for unexistent rover', () => {
    it("Responds with 400: 'Invalid Rover Name.'", (done) => {
      request(app)
        .get('/api/rovers/nonexistent')
        .expect(400, { error: 'Invalid Rover Name.' }, done);
    });
  });
  describe('Request for invalid camera type', () => {
    it("Responds with 400: 'Invalid camera for this rover.'", (done) => {
      request(app)
        .get('/api/rovers/curiosity/photos?camera=pancam')
        .expect(400, { error: 'Invalid camera for this rover.' }, done);
    });
  });
  describe('Request missing sol and earth_date', () => {
    it("Responds with 400: 'Missing required sol or earth_date value.'", (done) => {
      request(app)
        .get('/api/rovers/curiosity/photos')
        .expect(400, { error: 'Missing required sol or earth_date value.' }, done);
    });
  });
  describe('Request with invalid sol format', () => {
    it("Responds with 400: 'Invalid sol format. Must be a number starting from 0.'", (done) => {
      request(app)
        .get('/api/rovers/curiosity/photos?sol=abc')
        .expect(400, { error: 'Invalid sol format. Must be a number starting from 0.' }, done);
    });
  });
  describe('Request with invalid earth_date format', () => {
    it("Responds with 400: 'Invalid date format. Must be YYYY-MM-DD or YYYY-M-D. (Year must be higher than 2000).'", (done) => {
      request(app)
        .get('/api/rovers/curiosity/photos?earth_date=01/01/1990')
        .expect(400, { error: 'Invalid date format. Must be YYYY-MM-DD or YYYY-M-D. (Year must be higher than 2000).' }, done);
    });
  });
});

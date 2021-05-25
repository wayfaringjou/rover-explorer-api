const app = require('../../src/app');
/*
If request is done without sol parameter
it will return an empty array
Camera is optional */

/*
Validate queries and return errors for invalid ones
*/

describe('Rovers endpoint', () => {
  describe('GET requests to rovers/:rover', () => {
    it('Responds with photos from given rover fetched from NASA', (done) => {
      request(app)
        .get('/rovers/curiosity')
        .expect(200, [], done);
    });
  });
  describe('Request for unexistent rover', () => {
    it("Responds with 400: 'Invalid Rover Name.'", (done) => {
      request(app)
        .get('/rovers/nonexistent')
        .expect(400, 'Invalid Rover Name', done);
    });
  });
  describe('Request for invalid camera type', () => {
    it("Responds with 400: 'Invalid camera for this rover.'", (done) => {
      request(app)
        .get('/rovers/curiosity?camera=pancam')
        .expect(400, 'Invalid camera for this rover', done);
    });
  });
  describe('Request for invalid query', () => {
    it("Responds with 400: 'Invalid query'", (done) => {
      request(app)
        .get('/rovers/curiosity/?invalid=invalid')
        .expect(400, 'Invalid query', done);
    });
  });
});

const request = require('supertest');
const app = require('./app');


jest.mock('./models/BookedDates', () => {
  return new Promise((resolve, reject) => {
    resolve()
  })
});

const BookedDates = require('./models/BookedDates');


describe('server', () => {

    test('should respond with 200', (done) =>{
     request(app).get('/').then((response) => {
        expect(response.statusCode).toBe(200);
        done()
     });  
   });

   test('should have an id of 1', (done) => {
    request(app).get('/api/dates/:id').then((response) => {
      console.log(response)
      expect(response).toEqual()
      done()
    })
  })
});

    

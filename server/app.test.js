const supertest = require('supertest');
const app = require('./server');
const request = supertest(app)


const BookedDates = require('./models/BookedDates');

jest.mock('./models/BookedDates', () => {
  return new Promise((resolve, reject) => {
    resolve()
  })
});


describe('server', () => {

    test('should respond with 200', (done) =>{
     request(app).get('/').then((response) => {
        expect(response.statusCode).toBe(200);
        done()
     });  
   });

   test('should a listing id', (done) => {

    const data = {
      listing_id: [{listing_id: 1}]
    }

    BookedDates.findOne() = jest.fn().mockReturnValue(data);

    request.get('/api/dates/1').then((res) => {
      expect(BookedDates.findOne(data)).resolves.
      expect(res.body).toHaveProperty('listing_id')
      done()
    });
  });
});

    

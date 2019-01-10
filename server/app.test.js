 const supertest = require('supertest');
 const app = require('./app');


 const request = supertest(app);

 describe('server', () => {

  test('Should respond to GET request with a status Code 200', (done) => {

      request.get('/').then((response) => {
        expect(response.statusCode).toBe(200);
        done()
      });
    });

  test('Should respond to GET route /booking/1 with an Object that contains a listing price as a key', (done) => {

      request.get('/booking/1').then((response) => {
        expect(response).toHaveProperty('body.price');
        done()
      });
    });

  test('Should respond to GET route /booking/1 with a price that is greater than or equal to 50', (done) => {

    request.get('/booking/1').then((response) => {
      expect(response.body.price).toBeGreaterThanOrEqual(50);;
      done()
    });
  });

  test('Should respond to GET route /booking/1 with a price that is less than or equal to 100', (done) => {

    request.get('/booking/1').then((response) => {
      expect(response.body.price).toBeLessThanOrEqual(50);;
      done()
    });
  });

  test('Should respond to GET route /booking/1 with an Object that contains days as a key', (done) => {

    request.get('/booking/1').then((response) => {
      expect(response).toHaveProperty('body.days');
      done()
    });
  });

  test('Should respond to GET route /booking/1 with an days array that contains contains at least 50 items(days)', (done) => {

    request.get('/booking/1').then((response) => {
      expect(response.body.days.length).toBeGreaterThanOrEqual(50);
      done()
    });
  });


  test('Should respond with a status code 400 if booking request contains booked dates', (done) => {

    request.post('/booking/1')
      .send({
        startDate: '2018-03-14T07:00:00.000Z',
        endDate: '2018-09-30T07:00:00.000Z',
        guests: {
          adults: 1,
          childrend: 1,
          infants: 1
        }
      })
      .then((response) => {
      expect(response.statusCode).toBe(400);
      done()
    });
  });


  test('Should respond with status code 400 to booking request that has less than 1 adult', (done) => {

    request.post('/booking/1')
      .send({
        startDate: '2018-03-14T07:00:00.000Z',
        endDate: '2018-09-30T07:00:00.000Z',
        guests: {
          adults: 0,
          childrend: 1,
          infants: 1
        }
      })
      .then((response) => {
      expect(response.statusCode).toBe(400);
      done()
    });
  });

  test('Should respond with error message if it receives a booking request that has less than 1 adult', (done) => {

    request.post('/booking/1')
      .send({
        startDate: '2018-03-14T07:00:00.000Z',
        endDate: '2018-09-30T07:00:00.000Z',
        guests: {
          adults: 0,
          childrend: 1,
          infants: 1
        }
      })
      .then((response) => {
      expect(response.body.invalid).toBe('At least one adult must be in your party');
      done()
    });
  });

  

 })



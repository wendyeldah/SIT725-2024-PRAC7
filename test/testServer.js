const app = require('../server');
const { expect } = require('chai');
const request = require('supertest')(app);
const { runDBConnection } = require('../dbConnection');


describe('GET /api/cats', () => {
  let collection;

  before(async function () {
    this.timeout(10000);
    try {
      collection = await runDBConnection();
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  });

  it('should return all cat data', (done) => {
    request.get('/api/cats')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  after(async () => {
    try {
      await collection.drop(); 
    } catch (error) {
      console.error('Error dropping collection:', error);
    }
  });
});

describe('POST /api/cats', () => {
  let collection;

  before(async function () {
    this.timeout(10000); 
    try {
      collection = await runDBConnection();
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  });

  it('should save cat data', (done) => {
    const catData = {
      name: 'Fluffy',
      nickname: 'Fluff',
      picture_url: 'https://example.com/fluffy.jpg',
      description: 'A fluffy cat',
    };
    request.post('/api/cats')
      .send(catData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Form data saved successfully');
        done();
      });
  });
  describe('Database Connection', () => {
    it('should connect to the database successfully', async () => {
      try {
        const collection = await runDBConnection();
        expect(collection).to.exist;
        expect(collection).to.be.an('object');
        expect(collection.s.namespace.collection).to.equal('FormData');
      } catch (error) {
        // If the dat
        throw new Error('Failed to connect to the database');
      }
    });
  });
  
  after(async () => {
    try {
      await collection.drop();
    } catch (error) {
      console.error('Error dropping collection:', error);
    }
  });
});

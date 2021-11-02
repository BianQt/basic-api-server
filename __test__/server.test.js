'use strict';

const { app } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/models/index');

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});


describe('Server Test', () => {

  // Check if server is alive

  test('/', async () => {
    const response = await mockRequest.get('/');
    expect(response.text).toBe('Server is Up & Running!');
  });

  // Check if 404 is handled 

  test('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.get('/boo');
    expect(response.status).toBe(404);
  });

  
  // Movies test

  it('can add a movie', async () => {
    const response = await mockRequest.post('/movie').send({
        title:"RED",
        category: "action",
        rate:"PG-13",
        release_date:2010
    });
    expect(response.status).toBe(201);
  });

  it('can get all movies', async () => {
    const response = await mockRequest.get('/movies');
    expect(response.status).toBe(200);
  });

  it('can get one movie', async () => {
    const response = await mockRequest.get('/movie/1');
    expect(response.status).toBe(200);
  });

  it('can update a movie', async () => {
    const response = await mockRequest.put('/movie/1').send({
      title:"RED Ii",
      category: "action",
      rate:"PG-13",
      release_date:2015
  });
  expect(response.status).toBe(201);
  });

  
  it('can delete a movie', async () => {
    const response = await mockRequest.delete('/movie/1');
    expect(response.status).toBe(204);

  });


   // Books test

   it('can add a book', async () => {
    const response = await mockRequest.post('/book').send({
        title:"Book",
        category: "self-help",
        author:"Dale Cangie"
    });
    expect(response.status).toBe(201);
  });

  it('can get all books', async () => {
    const response = await mockRequest.get('/books');
    expect(response.status).toBe(200);
  });

  it('can get one book', async () => {
    const response = await mockRequest.get('/book/1');
    expect(response.status).toBe(200);
  });

  it('can update a book', async () => {
    const response = await mockRequest.put('/book/1').send({
      title:"how to engoy your job",
        category: "self-help",
        author:"Dale Cangie"
  });
  expect(response.status).toBe(201);
  });

  
  it('can delete a book', async () => {
    const response = await mockRequest.delete('/book/1');
    expect(response.status).toBe(204);
  });

});
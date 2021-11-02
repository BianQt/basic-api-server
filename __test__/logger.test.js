'use strict';
const loggerMiddleware = require('../src/middleware/logger');

// this file is only going ot be used to test out our logger middleware


describe('Logger Middleware', () => {

  let consoleSpy;
  let req = {}; 
  let res = {}; 
  let next = jest.fn(); 

  // this function is executed before every test unit starts
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  // this function is executed after every test unit is done
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  // check if theres any output
  test('properly logs some output', () => {
    loggerMiddleware(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  test('check if properly moved to the next middleware', () => {
    loggerMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});
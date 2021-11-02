'use strict';

const express = require('express');
const {books} = require('../models/index');

const booksRouter = express.Router();

booksRouter.get('/books', getAllBooks);
booksRouter.get('/book/:id', getOneBook);
booksRouter.post('/book', createBook);
booksRouter.put('/book/:id', updateBook);
booksRouter.delete('/book/:id', deleteBook);

async function getAllBooks(req, res) {
    const allbooks = await books.findAll();
    res.status(200).json(allbooks);

  }
  
  async function getOneBook(req, res) {
    const id = parseInt(req.params.id); 
    const book = await books.findOne({
      where: {
        id: id
      }
    });
    res.status(200).json(book);
  }
  
  async function createBook(req, res) {
    const obj = req.body;
    let book = await books.create(obj);
    res.status(201).json(book);
  
  }
  
  async function updateBook(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;
    let foundBook = await books.findOne({ where: { id: id } });
    const updatedBook = await foundBook.update(obj);
    res.status(201).json(updatedBook);
  }
  
  async function deleteBook(req, res) {
    const id = parseInt(req.params.id);
    const deletedBook = await books.destroy({ where: { id : id } });
    res.status(204).json(deletedBook);
  }
  
  
  module.exports = booksRouter;
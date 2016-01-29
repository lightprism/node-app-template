var express = require('express');
var bookRouter = express.Router();

var books = [
   {
      title: 'Some',
      genre: 'fiction',
      author: 'Someone',
      read: false
   },
   {
      title: 'Some 2',
      genre: 'non-fiction',
      author: 'another person',
      read: false
   },
   {
      title: 'some 3',
      genre: 'myster',
      author: 'LR Stin',
      read: false
   }
];


bookRouter.route('/')
   .get(function(req, res) {
      res.render('books', {
          title: 'books',
          nav: [{
              link: '/books',
              text: 'books'
          },
          {
              link: '/authors',
              text: 'authors'
              
          }],
          books: books
      });
   });
   
bookRouter.route('/single')
   .get(function(req, res) {
      res.send('single book page');
   });
   
module.exports = bookRouter;
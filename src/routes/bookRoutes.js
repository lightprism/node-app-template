var express = require('express');
var bookRouter = express.Router();

// function bundle route
var router = function(nav) {
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
             nav: nav,
             books: books
         });
      });
      
   bookRouter.route('/:id')
      .get(function(req, res) {
         var id = req.params.id;
         res.render('book', {
            title: 'Book',
            nav: nav,
            book: books[id]
         });
      });
      
   return bookRouter;
};

module.exports = router;
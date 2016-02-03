var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


// function bundle route
var router = function(nav) {
  
   bookRouter.route('/')
      .get(function(req, res) {
         // get all of our books from the mongo db
         var url = 'mongodb://localhost/book_app_temp';
         // plain ol' mongodb, without mongoose
         mongodb.connect(url, function(error, db) {
            // get our collection
            var collection = db.collection('books');
            collection.find({}).toArray(function(error, results) {
               res.render('books', {
                   title: 'books',
                   nav: nav,
                   books: results // results from the collection.find call
               });
            });
         });
      });
      
   bookRouter.route('/:id')
      .get(function(req, res) {
         var id = new objectId(req.params.id);
         // get all of our books from the mongo db
         var url = 'mongodb://localhost/book_app_temp';
         // plain ol' mongodb, without mongoose
         mongodb.connect(url, function(error, db) {
            // get our collection
            var collection = db.collection('books');
            collection.findOne({_id: id},    function(error, result) {
               res.render('book', {
                   title: 'books',
                   nav: nav,
                   book: result // results from the collection.find call
               });
            });
         });
      });
      
   return bookRouter;
};

module.exports = router;
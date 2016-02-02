var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient; // just pulling in one thing so far

 var books = [
   {
      title: 'Harry Potter Something',
      genre: 'fiction',
      author: 'J.K. Rowling',
      read: false
   },
   {
      title: 'Replay',
      genre: 'fiction',
      author: 'Repl Song',
      read: false
   },
   {
      title: 'MLK Bibliography',
      genre: 'non-fiction',
      author: 'MLK Fan',
      read: false
   },
   {
       title: 'Tom Sawyer',
       genre: 'fiction',
       author: 'Mark Twain',
       read: true
   }
];

var router = function(nav) {
    
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            // mongodb code to add book
            var url = 'mongodb://localhost/book_app_temp';
            mongodb.connect(url, function(error, db) {
                // use a collection
                var collection = db.collection('books');
                collection.insertMany(books, function(error, results) {
                    res.send(results);
                    db.close(); // close here
                });
            // if close db.close() here, the db would close right after the 'insertMany'
            });
            //res.send('inserting books');
        });
    
    return adminRouter;
};

module.exports = router;
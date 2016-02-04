var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient; // just pulling in one thing so far

var books = [
   {
      title: 'Altered Carbon',
      genre: 'sci-fi',
      author: 'Richard K. Morgan',
      read: false,
      bookId: 40445
   },
   {
      title: 'Replay',
      genre: 'fiction',
      author: 'Ken Grimwood',
      read: false,
      bookId: 341735
   },
   {
      title: '11/22/63',
      genre: 'fiction',
      author: 'Stephen King',
      read: false,
      bookId: 10644930
   },
   {
       title: 'Eragon',
       genre: 'fantasy',
       author: 'Christopher Paolini',
       read: true,
       bookId: 113436
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
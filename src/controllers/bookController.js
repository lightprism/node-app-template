var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

// bookService will handle api calls to goodreads
var bookController = function(bookService, nav) {
    function middleware(req, res, next) {
        // if(!req.user) {
        //     res.redirect('/');
        // }
        next()
    }
    
    function getIndex(req, res) {
        // get all of our books from the mongo db
        var url = 'mongodb://localhost/book_app_temp';
        // plain ol' mongodb, without mongoose
        mongodb.connect(url, function(error, db) {
            var collection = db.collection('books');
            
            collection.find({}).toArray(function(error, results) {
               res.render('books', {
                   title: 'books',
                   nav: nav,
                   books: results // results from the collection.find call
               });
            });
        });
    }
    
    function getById(req, res) {
        // console.log("Service in Controller is: " + bookService);
        var id = new objectId(req.params.id);
        // get all of our books from the mongo db
        var url = 'mongodb://localhost/book_app_temp';
        // plain ol' mongodb, without mongoose
        mongodb.connect(url, function(error, db) {
            // get our collection
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(error, result) {
                if(result.bookId) {
                    bookService.getBookById(result.bookId, function(error, book) {
                        result.book = book; // save our book from service into result.book
                        console.log("Result : " + result);
                        console.log("book: " + book);
                        res.render('book', {
                            title: 'books',
                            nav: nav,
                            book: result // results from the collection.find call
                        }); 
                    });
                } else {
                    res.render('book', {
                        title: 'books',
                        nav: nav,
                        book: result
                    });
                }
            });
        });
    }
    
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }
}


module.exports = bookController;
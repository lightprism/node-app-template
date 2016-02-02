var express = require('express');
var app = express();

var nav = [{
            link: '/books',
            text: 'books'
         },
         {
            link: '/authors',
            text: 'authors'
         }];
         
// IMPORT ROUTES
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);


// setting to use our public dir.
app.use(express.static('public'));
//app.use(express.static('src/views'));

// setting the view engine
app.set('view engine', 'ejs');
// setting the views directory
app.set('views', './src/views');

// using bookRouter = express.Router()
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

// HOME ROUTE
app.get('/', function(req, res) {
   res.render('index', {title: 'Home', nav: nav}); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Serving Up'); 
});



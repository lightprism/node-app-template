var express = require('express');
var app = express();

var bookRouter = require('./src/routes/bookroutes');

var nav = [
      {
         link: '/books', text: 'Books',
      },
      {
         link: '/authors', text: 'Authors'
      }
];

app.use(express.static('public'));
//app.use(express.static('src/views'));
// setting the view engine
app.set('view engine', 'ejs');
// setting the views
app.set('views', './src/views');

// using bookRouter = express.Router()
app.use('/books', bookRouter);


app.get('/', function(req, res) {
   res.render('index', {title: 'Home', nav: nav}); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Serving Up'); 
});



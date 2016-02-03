var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // parsing of body params
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

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
var authRouter = require('./src/routes/authRoutes')(nav);

// setting to use our public dir.
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'library'}));
//app.use(passport.initialize());
//app.use(passport.session());
require('./src/config/passport')(app);

//app.use(express.static('src/views'));

// setting the view engine
app.set('view engine', 'ejs');
// setting the views directory
app.set('views', './src/views');

// using bookRouter = express.Router()
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// HOME ROUTE
app.get('/', function(req, res) {
   res.render('index', {title: 'Home', nav: nav}); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Serving Up'); 
});



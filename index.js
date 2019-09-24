// base app 
const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const flash    = require('connect-flash');
const mailer = module.exports = require('express-mailer');

// usage

//let controller = require('./controllers/'); //controller functions 
let db = require('./db/'); // database pool connection 

//this is not ok !  TO DO : move the mail functions and initializer in another file 
//Configure express-mail and setup default mail data.
mailer.extend(app, {
    from: 'portal@wetterbest.ro',
    host: 'mail.wetterbest.ro', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
    user: 'portal@wetterbest.ro', // gmail id
    pass: '[eRuB24#1]' // gmail password
    }
  });



// port configuration 
app.listen(3001, console.log(`App started and its listening on port : 3001`));
// usage configuration 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser()); // read cookies (needed for auth)
app.use(cors());
// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// setting template 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./controllers/passport')(passport); // pass passport for configuration








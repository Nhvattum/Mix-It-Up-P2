// Required NPM Libraries
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const axios = require('axios');


// App Setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

// create new instance of class Sequelize Store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

// initialize passport and session info
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;

    next();
})

// ROUTES
app.get('/', function(req, res) {
    //check to see if user is logged in
    const randomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    axios.get(randomCocktail).then(function(response) {
        // console.log(response)
        
    res.render('index', {random: response.data.drinks});
    })
})


app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
})

// search page
app.get('/search', function(req, res) {
    const byName = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + req.query.search;
        
    axios.get(byName).then(function(res1) {
        // console.log(res1.data.drinks,'👅')
        
    res.render('search/search', {cocktail: res1.data.drinks});
    })
})

// show individual drink page
app.get('/search/:id', function(req, res) {
    const byName = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + req.params.strDrink;
        
    axios.get(byName).then(function(res2) {
        console.log(res2.data.drinks,'👅')
        let cocktail = res2.data.drinks
        
    res.render('search/show', {cocktail});
    })
})


// include auth controller
app.use('/auth', require('./controllers/auth'));


// initialise app on Port
app.listen(process.env.PORT || 3000, function() {
    console.log(`☕️ Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning ☕️.`)
});
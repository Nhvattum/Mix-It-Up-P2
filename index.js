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

// errorHandler
const errorHandler = error => {
    console.log('🔥🔥🔥🔥🔥🔥')
    console.log(error)
  }

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

// ROUTES ---------------------------------------------------------------------------
app.get('/', function(req, res) {
    //check to see if user is logged in
    const randomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    axios.get(randomCocktail).then(function(response) {
        // console.log(response)
        
    res.render('index', {random: response.data.drinks});
    })
})

// GET profile
app.get('/profile', isLoggedIn, function(req, res) {
    db.pantry.findAll().then(function(pantry) {
        console.log('found: 😓', pantry)
        res.render('profile', {pantry: pantry})
    }).catch(errorHandler)
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
    const byId = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + req.params.id;
        
    axios.get(byId).then(function(res2) {
        console.log(res2.data.drinks,'👅')
        // let details = res2.data.drinks
        
    res.render('search/show', {details: res2.data.drinks});
    }).catch(errorHandler);
})


// POST to favorites
app.post('/favorites', function(req, res) {
    console.log(req.body.cocktailId + "🚀")
    console.log(req.body.cocktailName + "😆")

    db.favorite.findOrCreate({
        where: {
          name: req.body.cocktailName,
          idDrink: req.body.cocktailId,
          userId: req.user.id
        }
    }).then(([favorite, created]) => {
        res.redirect('favorites')
        console.log(`🐶 ${favorite.name} was ${created ? 'created👍' : 'found🔎'}`)
    }).catch(errorHandler);
})



// GET all favorited cocktails
app.get('/favorites' ,function(req, res) {
    db.favorite.findAll().then(function(fav) {
        res.render('favorites/index', {fav: fav})
    }).catch(errorHandler);
})


// GET individual favorite drink details
app.get('/favorites/:id', function(req, res) {
    const byId = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + req.params.id;
        
    axios.get(byId).then(function(res2) {
        // console.log(res2.data.drinks,'👅')

        res.render('favorites/show', {details: res2.data.drinks[0]});
    }).catch(errorHandler);
})


// GET list of ingredients
// Erik helped me write the code to sort the results alphebetically, and I still don't 100% understand what it is doing
app.get('/ingredients', function(req, res) {
    const byIngredient = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
        
    axios.get(byIngredient).then(function(ingredient) {
        // console.log(ingredient.data.drinks,'👅')
        let sortedIngredients = ingredient.data.drinks.map(ingredientObject => {
            return ingredientObject.strIngredient1
        }).sort();

    res.render('ingredients/ingredients', {ingredient: sortedIngredients});
    })
})

// POST new pantry
app.post('/pantries', function(req, res) {
    console.log(req.body.pantryName + '🐙')
    db.pantry.findOrCreate({
        where: {
            name: req.body.pantryName,
            userId: req.user.id
        }
    }).then(([pantry, created]) => {
        console.log(`🐶 ${pantry.name} was ${created ? 'created👍' : 'found🔎'}`)
        res.redirect('profile')
    }).catch(errorHandler)
})

// GET profile
// app.get('/profile', function(req, res) {
//     db.pantry.findAll().then(function(pantry) {
//         console.log('found: 😓', pantry)
//         res.render('profile', {pantry: pantry})
//     }).catch(errorHandler)
// })


// include auth controller
app.use('/auth', require('./controllers/auth'));

// app.use('/search', require('./controllers/search'));


// initialise app on Port
app.listen(process.env.PORT || 3000, function() {
    console.log(`☕️ Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning ☕️.`)
});
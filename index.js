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
const methodOverride = require('method-override');
const key = process.env.MY_KEY;


// App Setup
const app = Express();
app.use(methodOverride('_method'));
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
    const randomCocktail = `https://www.thecocktaildb.com/api/json/v2/${key}/random.php`;

    axios.get(randomCocktail).then(function(response) {
        // console.log(response)
        
    res.render('index', {random: response.data.drinks});
    })
})

// GET profile
app.get('/profile', isLoggedIn, function(req, res) {
    db.pantry.findAll({
        where: {userId: req.user.id},
        include: [db.ingredient]
    }).then(function(pantry) { 
        // console.log(pantry[2].ingredients, "☕️🐋")       
        // console.log('found: 😓', pantry)
        res.render('profile', {pantry: pantry})
    }).catch(errorHandler)
})

// GET search page
// SOURCE https://www.developintelligence.com/blog/2016/02/replace-spaces-underscores-javascript/
app.get('/search', function(req, res) {
    const byName = `https://www.thecocktaildb.com/api/json/v2/${key}/search.php?s=${req.query.search}`;

    if (req.query.search) {
        axios.get(byName).then(function(res1) {
            // console.log(res1.data.drinks,'👅')
            
            res.render('search/search', {cocktail: res1.data.drinks});
        }).catch(errorHandler);
    } else if (req.query.multiSearch) {
        let i = 0
        let search = req.query.multiSearch;
        // console.log(search, "🇳🇴")
        for(i; i < search.length; i++) {
            search[i] = search[i].replace(" ", "_");
        }
        let ingredientList = search.join(",")
        const byIngredient = `https://www.thecocktaildb.com/api/json/v2/${key}/filter.php?i=${ingredientList}`;

        // console.log(ingredientList, "🎭🎭🎭🎭🎭")
        axios.get(byIngredient).then(function(multiSearchResults) {
            // console.log("🎯", multiSearchResults.data.drinks)

            res.render('search/search', {cocktail: multiSearchResults.data.drinks});
            // res.send(search)

        }).catch(errorHandler);
    } else {
        let cocktail = [];
        res.render('search/search', {cocktail})
    }
})
    
// GET searchPantry
app.get('/search/pantry', function(req, res) {
    if (req.query.ingredientName) {
        let i = 0
        let search = req.query.ingredientName;
        for(i; i < search.length; i++) {
            search[i] = search[i].replace(" ", "_");
        }
        
        let ingredientList = search.join(",");
        
        console.log(ingredientList, "🎭🎭🎭🎭🎭")
        
        const byPantry = `https://www.thecocktaildb.com/api/json/v2/${key}/filter.php?i=${ingredientList}`;
        db.pantry.findAll({
        where: {userId: req.user.id},
        include: [db.ingredient]

        }).then(function(pantry){
            axios.get(byPantry).then(function(res2) {
                // console.log("🎉🎉🎉🎉🎉🎉🎉🎉")
                console.log("backend list 🚜🚜🚜🚜🚜🚜", res2.data.drinks)
                res.render('pantries/searchPantry', {pantry, pantryCocktail: res2.data.drinks});
                // res.send(pantry)
            })
        }).catch(errorHandler)
    } else {
        db.pantry.findAll({
            where: {userId: req.user.id},
            include: [db.ingredient]
        }).then(function(pantry){
                // console.log(res2.data.drinks[0].strDrink + "🎉🎉🎉🎉🎉🎉🎉🎉")
                let pantryCocktail = [];
                res.render('pantries/searchPantry', {pantry, pantryCocktail});
                // res.send(pantry)
        
        }).catch(errorHandler)
    }
})


// show individual drink page
app.get('/search/drinks/:id', function(req, res) {
    const byId = `https://www.thecocktaildb.com/api/json/v2/${key}/lookup.php?i=${req.params.id}`;
        
    axios.get(byId).then(function(res2) {
        // console.log(res2.data.drinks,'👅')
        // let details = res2.data.drinks
        
    res.render('search/show', {details: res2.data.drinks});
    }).catch(errorHandler);
})

// POST to favorites
app.post('/favorites', function(req, res) {
    // console.log(req.body.cocktailId + "🚀")
    // console.log(req.body.cocktailName + "😆")

    db.favorite.findOrCreate({
        where: {
          name: req.body.cocktailName,
          idDrink: req.body.cocktailId,
          userId: req.user.id
        }
    }).then(([favorite, created]) => {
        res.redirect('favorites')
        // console.log(`🐶 ${favorite.name} was ${created ? 'created👍' : 'found🔎'}`)
    }).catch(errorHandler);
})

// DELETE a pantry
app.delete('/favorites/:idDrink', function(req, res) {
    db.favorite.destroy({
        where: {
            idDrink: req.params.idDrink,
            userId: req.user.id
        }
    }).then(function() {
        res.redirect('/favorites')
    }).catch(errorHandler)
})


// GET all favorited cocktails
app.get('/favorites' ,function(req, res) {
    db.favorite.findAll().then(function(fav) {
        res.render('favorites/index', {fav: fav})
    }).catch(errorHandler);
})


// GET individual favorite drink details
app.get('/favorites/:id', function(req, res) {
    const byId = `https://www.thecocktaildb.com/api/json/v2/${key}/lookup.php?i=${req.params.id}`;
        
    axios.get(byId).then(function(res2) {
        // console.log(res2.data.drinks,'👅')

        res.render('favorites/show', {details: res2.data.drinks});
    }).catch(errorHandler);
})


// GET list of ingredients
// Sources: Erik helped me write the code to sort the results alphebetically, and I still don't 100% understand how map is working
app.get('/ingredients', function(req, res) {
    const byIngredient = `https://www.thecocktaildb.com/api/json/v2/${key}/list.php?i=list`;
        
    axios.get(byIngredient).then(function(ingredient) {
        // console.log(ingredient.data.drinks,'👅')
        let sortedIngredients = ingredient.data.drinks.map(ingredientObject => {
            return ingredientObject.strIngredient1
        }).sort();
        db.pantry.findAll({
            where: {
                userId: req.user.id
            }
        }).then(function(pantry) {
            res.render('ingredients/ingredients', {ingredient: sortedIngredients, pantry});
            // console.log('found: 😓', pantry)
        })
    }).catch(errorHandler)
})

// POST new pantry
app.post('/pantries', function(req, res) {
    // console.log(req.body.pantryName + '🐙')
    db.user.findOne({
        where: {
            id: req.user.id
        }
    }).then(user => {
        db.pantry.findOrCreate({
            where: {
                name: req.body.pantryName,
                userId: user.id
            }
        }).then(([pantry, created]) => {
            // console.log(`🐶 ${pantry.name} was ${created ? 'created👍' : 'found🔎'}`)
            res.redirect('profile')
    })
    }).catch(errorHandler)
})

// DELETE a pantry
app.delete('/pantries/:name', function(req, res) {
    db.pantry.destroy({
        where: {
            name: req.params.name,
            userId: req.user.id
        }
    }).then(function() {
        res.redirect('/profile')
    }).catch(errorHandler)
})

// DELETE an ingredient
app.delete('/ingredients/:name', function(req, res) {
    db.ingredient.destroy({
        where: {
            name: req.params.name,
            pantryId: req.body.pantryId
        }
    }).then(function() {
        res.redirect('/profile')
    }).catch(errorHandler)
})

// POST new ingredients
app.post('/ingredients', function(req, res) {
    // console.log(req.body.ingredient + '🐙')
    db.pantry.findOne({
        where: {
            id: req.body.pantryName
        }
    }).then(pantry => {
    db.ingredient.findOrCreate({
        where: {
            name: req.body.ingredientName,
            pantryId: req.body.pantryName
        }
    }).then(([ingredient, created]) => {
        // console.log(`🐶 ${ingredient.name} was ${created ? 'created👍' : 'found🔎'}`)
        pantry.addIngredient(ingredient)
        res.redirect('ingredients')
    })
    }).catch(errorHandler)
})

// include auth controller
app.use('/auth', require('./controllers/auth'));

// app.use('/search', require('./controllers/search'));


// initialise app on Port
app.listen(process.env.PORT || 3000, function() {
    console.log(`☕️ Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning ☕️.`)
});
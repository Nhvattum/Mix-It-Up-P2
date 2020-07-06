var express = require('express');
var router = express.Router();
var db = require('../models')
const axios = require('axios');

const errorHandler = error => {
  console.log('🔥🔥🔥🔥🔥🔥')
  console.log(error)
}

// // search page
// router.get('/', function(req, res) {
//     const byName = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + req.query.search;
        
//     axios.get(byName).then(function(res1) {
//         // console.log(res1.data.drinks,'👅')
        
//     res.render('search/search', {cocktail: res1.data.drinks});
//     })
// })

// // show individual drink page
// router.get('/:id', function(req, res) {
//     const byId = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + req.params.id;
        
//     axios.get(byId).then(function(res2) {
//         console.log(res2.data.drinks,'👅')
//         // let details = res2.data.drinks
        
//     res.render('search/show', {details: res2.data.drinks});
//     }).catch(errorHandler);
// })

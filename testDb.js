var db = require('./models');
const errorHandler = error => {
    console.log('🔥🔥🔥🔥🔥🔥')
    console.log(error)
  }

//   db.pantry.findOrCreate({
//       where: {
//         name: 'cabin'
//       }
//     }).then(([pantry, created]) => {
//       console.log(`🐶 ${pantry.name} was ${created ? 'created👍' : 'found🔎'}`)
      
// }).catch(errorHandler)

db.favorite.findOrCreate({
    where: {
      name: 'water'
    }
  }).then(([favorite, created]) => {
    console.log(`🐶 ${favorite.name} was ${created ? 'created👍' : 'found🔎'}`)
    
}).catch(errorHandler)
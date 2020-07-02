const errorHandler = error => {
    console.log('🔥🔥🔥🔥🔥🔥')
    console.log(error)
  }

  project2-express.addColumn(
    'users',
    'favoriteId',
    Sequelize.integer
  ).catch(console.log(errorHandler))
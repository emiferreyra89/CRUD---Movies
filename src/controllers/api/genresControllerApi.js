const db = require('../../database/models/index');

const genresControllerApi = {
  list: async (req,res) => {
    try {
      await db.Genre.findAll()
        .then((genres => {
          res.json({
            meta:{
              status: 200,
              total: genres.length,
              url:'api/genres/list'
            },
            data:genres
          })
        }))
    } catch (error) {
        res.status(400).send(error.message)
    }
  },

  detail: async (req,res) => {
    try {
      await db.Genre.findByPk(req.params.id)
        .then((genre) => {
          res.status(200).send(genre)
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
  },

}

module.exports = genresControllerApi
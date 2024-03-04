const db = require('../database/models/index');

const genresController = {
    list: (req,res) => {
        db.Genre.findAll()
            .then((genres) => {
                res.render('genresList',{ genres : genres })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            }) 
    },

    detail: (req,res) => {
        const {id} = req.params
        db.Genre.findByPk(id)
            .then((genre) => {
                res.render('genresDetail',{ genre : genre })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
    }
}

module.exports = genresController
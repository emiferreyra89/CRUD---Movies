const db = require('../database/models/index');

const moviesController = {
    list: (req,res) => {
        db.Movie.findAll()
            .then((movies) => {
                res.render('moviesList',{ movies : movies })
            })
            .catch(error => {
                res.send("Por aca no es")
            })  
    },

    new: (req,res) => {
        db.Movie.findAll({
            order : [
                ['release_date','DESC']
            ]
        })
            .then((movies) => {
                res.render('newestMovies',{ movies : movies })
            })
            .catch(error => {
                res.send("Por aca no es")
            })  
    },

    recomended: (req,res) => {
        db.Movie.findAll({
            order : [
                ['release_date','DESC']
            ],
            limit : 5
            })
            .then((movies) => {
                res.render('recommendedMovies',{ movies : movies })
            })
            .catch(error => {
                res.send("Por aca no es")
            })  
    },

    detail: (req,res) => {
        const {id} = req.params
        db.Movie.findByPk(id)
            .then((movie) => {
                res.render('moviesDetail',{ movie:movie })
            })
            .catch(error => {
                res.send("Por aca no es")
            })
    }
}

module.exports = moviesController
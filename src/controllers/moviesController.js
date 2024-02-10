const db = require('../database/models/index');
const {validationResult} = require('express-validator')

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
                ['rating','DESC'],
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
    },

    add: (req,res) => {
        res.render('form-create-movies', {title:'New Movie'})
    },

    create: (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render('form-create-movies', {title:'New Movie', errors:errors.mapped(), oldData:req.body})
        } else {
            const {title,rating,awards,release_date,length} = req.body;
            db.Movie.create({
                title,
                rating,
                awards,
                release_date,
                length
            })
            .then(movie => {
                res.redirect('/movies/new')
            })
            .catch(error => {
                res.send("Por aca no es")
            })
        }
    },

    edit: (req,res) => {
        const {id} = req.params
        db.Movie.findByPk(id)
            .then((movie) => {
                res.render('form-update-movies', {title:'Edit Movie', movie:movie })
            })
            .catch(error => {
                res.send("Por aca no es")
            })
    },

    update: (req,res) => {
        const errors = validationResult(req);
        const {id} = req.params;
        const {title,rating,awards,release_date,length} = req.body;
        if(!errors.isEmpty()) {
            db.Movie.findByPk(id)
            .then((movie) => {
                res.render('form-update-movies', {title:'Edit Movie', movie:movie, errors:errors.mapped(), oldData:req.body })
            })
            .catch(error => {
                res.send("Por aca no es")
            })
        } else {
            db.Movie.update(
                {
                    id,
                    title,
                    rating,
                    awards,
                    release_date,
                    length
                }, 
                {
                    where : { id }
                }
            )
            .then(movie => {
                res.redirect(`/movies/detail/${id}`)
            })
            .catch(error => {
                res.send("Por aca no es")
            })
        }
    },

    delete: (req,res) => {
        const {id} = req.params
        db.Movie.destroy({
            where : { id }
        })
        .then(movie => {
            res.redirect('/movies')
        })
        .catch(error => {
            res.render('errorView',{title:"Error"})
        })   
    }
}

module.exports = moviesController

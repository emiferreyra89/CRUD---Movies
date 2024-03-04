const db = require('../database/models/index');
const {validationResult} = require('express-validator');
const {format} = require('@formkit/tempo');

const moviesController = {
    list: (req,res) => {
        db.Movie.findAll({
            include:[{association:'genres'},{association:'actors'}]
        })
            .then((movies) => {
                res.render('movies/moviesList',{ movies : movies })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })  
    },

    new: (req,res) => {
        db.Movie.findAll({
            order : [
                ['release_date','DESC']
            ]
        })
            .then((movies) => {
                res.render('movies/newestMovies',{ movies : movies })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
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
                res.render('movies/recommendedMovies',{ movies : movies })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })  
    },

    detail: (req,res) => {
        const {id} = req.params
        db.Movie.findByPk(id,{
            include:[{association:'genres'},{association:'actors'}]
        })
            .then((movie) => {
                res.render('movies/moviesDetail',{movie:movie})
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
    },

    add: (req,res) => {
        db.Genre.findAll()
        .then((genres) => {
            res.render('movies/form-create-movies', {title:'New Movie', genres})
        })
        .catch(error => {
            res.render('errorView',{title:"Error"})
        }) 
    },

    create: (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            db.Genre.findAll()
            .then((genres) => {
                res.render('movies/form-create-movies', {title:'New Movie', genres, errors:errors.mapped(), oldData:req.body})
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            }) 
        } else {
            const {title,rating,awards,release_date,length,genre_id} = req.body;
            db.Movie.create({
                title,
                rating,
                awards,
                release_date,
                length,
                genre_id
            })
            .then(movie => {
                res.redirect('/movies/new')
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
        }
    },

    edit: (req,res) => {
        const {id} = req.params
    let promesaMovie = db.Movie.findByPk(id);
    let promesaGenres = db.Genre.findAll();
    Promise.all([promesaMovie,promesaGenres])
            .then(([movie,genres]) => {
                const {id,title,rating,awards,release_date,length,genre_id} = movie
                let fecha = format(release_date,"YYYY-MM-DD");
                movie = {
                    id,
                    title,
                    rating,
                    awards,
                    release_date : fecha,
                    length,
                    genre_id
                };
                res.render('movies/form-update-movies', {title:'Edit Movie', movie, genres:genres })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
    },

    update: (req,res) => {
        const errors = validationResult(req);
        const {id} = req.params;
        const {title,rating,awards,release_date,length,genre_id} = req.body;
        let promesaMovie = db.Movie.findByPk(id);
        let promesaGenres = db.Genre.findAll();
        if(!errors.isEmpty()) {
            Promise.all([promesaMovie,promesaGenres])
            .then(([movie,genres]) => {
                res.render('movies/form-update-movies', {title:'Edit Movie', movie, genres, errors:errors.mapped(), oldData:req.body })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
        } else {
            db.Movie.update(
                {
                    id,
                    title,
                    rating,
                    awards,
                    release_date,
                    length,
                    genre_id
                }, 
                {
                    where : { id }
                })
            .then(movie => {
                res.redirect(`/movies/detail/${id}`)
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
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

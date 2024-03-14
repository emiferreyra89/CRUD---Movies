const db = require('../database/models/index');
const {validationResult} = require('express-validator');
const {format} = require('@formkit/tempo');
const { Op } = require('sequelize')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


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

    search: async (req,res) => {
        try {
            const {titulo} = req.body
            const movieDB = await db.Movie.findOne({
              where: {title: {[Op.like]:`%${titulo}%`}},
              include:[{association:'genres'},{association:'actors'}]
              })
            const movieAPI = await fetch(`http://www.omdbapi.com/?apikey=dc58fc08&t=${titulo}&type=movie`)
            .then(response => response.json())
            .then((movie) => {
              return movie
            })
            Promise.all([movieDB,movieAPI])
            .then( result => {
              let movies = {}
              if (result[0] != null) {
                let movie = result[0]
                return res.render('movies/moviesList',{movies,movie})
              } else {
                let movie = result[1]
                return res.render('movies/moviesList',{movies,movie})
              }
            })
          } catch (error) {console.log(error)}  
    },

    new: (req,res) => {
        db.Movie.findAll({
            order : [
                ['release_date','DESC']
            ],
            limit: 5
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
                ['rating','DESC']
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
    
    detail: async (req,res) => {
        try {
            const {id} = req.params

            let movieDB = await db.Movie.findByPk(id,{
                include:[{association:'genres'},{association:'actors'}]
            })
                .then( result => {return result})

            let movieAPI = await fetch(`http://www.omdbapi.com/?apikey=dc58fc08&i=${id}`)
                .then(response => response.json())
                .then((movie) => {
                    return movie
                })

                res.render('movies/moviesDetail',{movieDB,movieAPI})

            // if(movieDB != null) {
            //     //let movie = movieDB
            //     //res.send(movie)
            //     res.render('movies/moviesDetail',{movieDB})
            // } else {
            //     let movie = movieAPI
            //     //res.send(movie)
            //     res.render('movies/moviesDetail',{movieAPI})
            // }

            //  Promise.all([movieDB,movieAPI])
            // .then((result) => {
            //     if(result[0] != 0) {
            //         let movie = result[0]
            //         res.render('movies/moviesDetail',{movie})
            //     } else {
            //         let movie = result[1]
            //         res.render('movies/moviesDetail',{movie})
            //     }
            // })

        } catch (error) {
            
        }
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
            where : { id }, force: true
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

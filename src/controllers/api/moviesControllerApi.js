const db = require('../../database/models/index')
const {validationResult} = require('express-validator')
const { Op } = require('sequelize')
//const fetch = require('node-fetch')
//import fetch from 'node-fetch'
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const moviesControllerApi = {
  list: async (req,res) => {
    try {
      await db.Movie.findAll({
        include:[{association:'genres'},{association:'actors'}]
      })
        .then((movies) => {
          res.status(200).json({
            meta:{
              status: 200,
              total: movies.length,
              url:'api/movies/list'
            },
            data: movies
          })
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
  },

  searchMovies: async (req,res) => {
    try {
      await fetch('http://www.omdbapi.com/?apikey=dc58fc08&t=&type=movie')
      .then(response => response.json())
      .then((movie) => {
        res.status(200).json(movie)
      })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  create: async (req,res) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        let movie = await db.Movie.create(req.body)
        return res.status(200).json({
          data: movie,
          status: 200,
          created: "ok"
        })
      } else {
        const errorsMapped = errors.mapped()
        for (const key in errorsMapped) {
          delete errorsMapped[key].type;
          delete errorsMapped[key].location;
          delete errorsMapped[key].path;
        }
        const errorsJson = JSON.stringify(errorsMapped)
        throw new Error (errorsJson)
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
  },

  update: async (req,res) => {
    try {
      const {id} = req.params;
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        let movieUpdate = await db.Movie.update(
          (req.body),
          {where : {id}}
        )
        return res.status(200).json({
          data: movieUpdate,
          status: 200,
          update: "ok"
        })
      } else {
        const errorsMapped = errors.mapped()
        for (const key in errorsMapped) {
          delete errorsMapped[key].type;
          delete errorsMapped[key].location;
          delete errorsMapped[key].path;
        }
        const errorsJson = JSON.stringify(errorsMapped)
        throw new Error (errorsJson)
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
  },

  delete: async (req,res) => {
    try {
      const {id} = req.params
      await db.Movie.destroy({
        where:{id}, force:true
      })
        .then((result) => {
          res.status(200).json({
            reference_id: id,
            status: 200,
            deleted: "ok"
          })
        })
    } catch (error) {
      res.status(200).send(error.message)
    }
  }
}

module.exports = moviesControllerApi
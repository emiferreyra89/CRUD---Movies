const express = require('express');
const router = express.Router();
const moviesControllerApi = require('../../controllers/api/moviesControllerApi');
const {valid_Movies_create,valid_Movies_update} = require('../../validations/validationsMovies');


///..Listar todas las películas de la base de datos...
router.get('/api/movies/list', moviesControllerApi.list);

///..Retornar la pelicula indicada de la API OMDb...
router.post('/api/movies/search', moviesControllerApi.searchMovies);

///..Recibe los datos de un formulario anterior y escribe la información en la base de datos creando una nueva pelicula...
router.post('/api/movies/create', valid_Movies_create, moviesControllerApi.create);

///..Recibe los datos de un formulario y sobreescribe la información de una pelicula existente en la base de datos...
router.put('/api/movies/update/:id', valid_Movies_update, moviesControllerApi.update);

///..Elimina la película indicada en la URL según el ID...
router.delete('/api/movies/delete/:id', moviesControllerApi.delete);

module.exports = router
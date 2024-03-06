const express = require('express');
const router = express.Router();
const moviesControllerApi = require('../../controllers/api/moviesControllerApi');
const {valid_Movies_create} = require('../../validations/validationsMovies');


///..Listar todas las películas de la base de datos...
router.get('/api/movies/list', moviesControllerApi.list);

///..Recibe los datos del formulario anterior y escribe la información en la base de datos...
router.post('/api/movies/create', valid_Movies_create, moviesControllerApi.create);

///..Elimina la película indicada en la URL según el ID...
router.delete('/api/movies/delete/:id', moviesControllerApi.delete);

module.exports = router
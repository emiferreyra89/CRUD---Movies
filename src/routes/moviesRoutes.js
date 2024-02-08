const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

///..Listar todas las películas de la base de datos...
router.get('/movies', moviesController.list);

///..Listar todas las películas por orden de lanzamiento (de la mas actual a la ultima)...
router.get('/movies/new', moviesController.new);

///..Listar las ultimas 5 películas por orden de lanzamiento (mostrar rating)...
router.get('/movies/recommended', moviesController.recomended);

///..Mostrar el detalle de la película seleccionada de la lista (título, rating, premios, duración y fecha de estreno)....
router.get('/movies/detail/:id', moviesController.detail);


module.exports = router;
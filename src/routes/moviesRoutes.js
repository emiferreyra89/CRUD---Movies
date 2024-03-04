const express = require('express');
const router = express.Router();
const {valid_Movies_create,valid_Movies_update} = require('../validations/validationsMovies')

const moviesController = require('../controllers/moviesController');
 

///..Listar todas las películas de la base de datos...
router.get('/movies', moviesController.list);

///..Listar todas las películas por orden de lanzamiento (de la mas actual a la ultima)...
router.get('/movies/new', moviesController.new);

///..Listar las ultimas 5 películas por orden de lanzamiento (mostrar rating)...
router.get('/movies/recommended', moviesController.recomended);

///..Mostrar el detalle de la película seleccionada de la lista (título, rating, premios, duración y fecha de estreno)....
router.get('/movies/detail/:id', moviesController.detail);

///..Muestra el formulario para la creación de una película...
router.get('/movies/add', moviesController.add);

///..Recibe los datos del formulario anterior y escribe la información en la base de datos...
router.post('/movies/create', valid_Movies_create, moviesController.create);

///..Muestra un formulario ya completo con los datos de la película según el id que indica la URL...
router.get('/movies/edit/:id', moviesController.edit);

///..Recibe información del formulario anterior y en conjunto con el id que indica la URL actualiza la información de la película...
router.put('/movies/update/:id', valid_Movies_update, moviesController.update);

///..Elimina la película indicada en la URL según el ID...
router.delete('/movies/delete/:id', moviesController.delete);

module.exports = router;
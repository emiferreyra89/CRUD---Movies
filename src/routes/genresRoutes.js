const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

///..Listar todos los generos de la base de datos...
router.get('/genres', genresController.list);

///..Mostrar el detalle del genero seleccionado de la lista (Id, name, ranking)...
router.get('/genres/detail/:id', genresController.detail);


module.exports = router;
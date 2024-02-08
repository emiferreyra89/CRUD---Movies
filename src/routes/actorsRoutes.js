const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

///..Listar todos los actores de la base de datos...
router.get('/actors', actorsController.list);

///..Listar los 5 mejores actores segun su rating...
router.get('/actors/recommended', actorsController.recomended);

///..Mostrar el detalle del actor seleccionado de la lista (nombre, apellido, rating)...
router.get('/actors/detail/:id', actorsController.detail);


module.exports = router;
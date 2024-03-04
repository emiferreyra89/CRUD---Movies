const express = require('express');
const router = express.Router();
const {valid_Actors} = require('../validations/validationsActors');

const actorsController = require('../controllers/actorsController');


///..Listar todos los actores de la base de datos...
router.get('/actors', actorsController.list);

///..Listar los 5 mejores actores segun su rating...
router.get('/actors/recommended', actorsController.recomended);

///..Mostrar el detalle del actor seleccionado de la lista (nombre, apellido, rating)...
router.get('/actors/detail/:id', actorsController.detail);

///..Muestra el formulario para la creación de un actor...
router.get('/actors/add',actorsController.add);

///..Recibe los datos del formulario anterior y escribe la información en la base de datos...
router.post('/actors/create', valid_Actors, actorsController.create);

///..Muestra un formulario ya completo con los datos del actor según el id que indica la URL...
router.get('/actors/edit/:id', actorsController.edit);

///..Recibe información del formulario anterior y en conjunto con el id que indica la URL actualiza la información del actor...
router.put('/actors/update/:id', valid_Actors, actorsController.update);

 ///..Elimina el actor indicada en la URL según el ID...
 router.delete('/actors/delete/:id', actorsController.delete);


module.exports = router;
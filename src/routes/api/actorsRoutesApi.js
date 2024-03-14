const express = require('express');
const router = express.Router();
const actorsControllerApi = require('../../controllers/api/actorsControllerApi');
const {valid_Actors} = require('../../validations/validationsActors')


///..Listar todos los actores de la base de datos...
router.get('/api/actors/list', actorsControllerApi.list);

///..Recibe los datos de un formulario y escribe la información en la base de datos creando un nuevo actor...
router.post('/api/actors/create', valid_Actors, actorsControllerApi.create);

///..Recibe los datos de un formulario y sobreescribe la información de un actor existente en la base de datos...
router.put('/api/actors/update/:id', valid_Actors, actorsControllerApi.update);

///..Elimina de la base de datos el actor indicada en la URL según el ID...
router.delete('/api/actors/delete/:id', actorsControllerApi.delete);

module.exports = router
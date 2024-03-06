const express = require('express');
const router = express.Router();
const actorsControllerApi = require('../../controllers/api/actorsControllerApi');
const {valid_Actors} = require('../../validations/validationsActors')


///..Listar todos los actores de la base de datos...
router.get('/api/actors/list', actorsControllerApi.list);

///..Recibe los datos del formulario anterior y escribe la información en la base de datos...
router.post('/api/actors/create', valid_Actors, actorsControllerApi.create);

///..Elimina el actor indicada en la URL según el ID...
router.delete('/api/actors/delete/:id', actorsControllerApi.delete);

module.exports = router
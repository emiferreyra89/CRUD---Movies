const express =  require('express');
const router = express.Router();
const genresControllerApi = require('../../controllers/api/genresControllerApi');


//..Listar todos los generos...
router.get('/api/genres/list', genresControllerApi.list);

///..Mostrar el detalle del genero seleccionado de la lista (Id, name, ranking)...
router.get('/api/genres/detail/:id', genresControllerApi.detail);

module.exports = router
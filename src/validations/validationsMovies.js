const {body} = require('express-validator');

const validations_Movies = [
    body('title')
    .notEmpty().withMessage('Debes ingresar un Nombre').bail()
    .isLength({ min:1, max:500 }),
    body('rating')
    .notEmpty().withMessage('Debes ingresar el Rating').bail()
    .isNumeric({min:0}).withMessage('Solo admite numeros'),
    body('awards')
    .notEmpty().withMessage('Debes ingresar la cantidad de Premios de la pelicula ((0) cero si no tiene)').bail()
    .isNumeric({min:0}).withMessage('Solo admite numeros'),
    body('release_date')
    .notEmpty().withMessage('Debes ingresar la Fecha de Estreno'),
    body('length')
    .notEmpty().withMessage('Debes ingresar el Tiempo de Duracion de la pelicula en minutos').bail()
    .isNumeric({min:0}).withMessage('Solo admite numeros')
]

module.exports = validations_Movies
const {body} = require('express-validator');

const valid_Actors = [
    body('first_name')
    .notEmpty().withMessage('Debes ingresar un Nombre').bail()
    .matches(/^[a-zA-Z\s]+$/).withMessage('Solo puedes ingresar letras').bail()
    .isLength({ min:2, max:50 }).withMessage('Debe contener mas de 2 (dos) letras'),
    body('last_name')
    .notEmpty().withMessage('Debes ingresar un Apellido').bail()
    .matches(/^[a-zA-Z\s]+$/).withMessage('Solo puedes ingresar letras').bail()
    .isLength({ min:2, max:50 }).withMessage('Debe contener mas de 2 (dos) letras'),
    body('rating')
    .notEmpty().withMessage('Debes ingresar el Rating, solo admite numeros').bail()
    .isFloat({min:0, max:10}).withMessage('El rating es de 0 a 10 y admite decimales (Por ej., 7.5)'),
];

module.exports = {valid_Actors}

    /*      -_-_-_-_-_-_-     .matches(/^[a-zA-Z\s]+$/, 'g')      -_-_-_-_-_-_- 

    Es una expresion regular que admite un string de caracteres alfabeticos con espacios incluidos
    
    */
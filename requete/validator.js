const {check, validationResult } = require("express-validator");

exports.valida =[

    check('nom').not().isEmpty().withMessage('le champ du nom ne doit pas être vide')
    .isLength({min:3,max:20})
    .withMessage('le champ du nom ne doit comporter au moins 3 caractéres')
    .isAlpha().withMessage('le champ du nom ne doit pas comporter des caracteres spéciaux '),


    check('prenom').not().isEmpty().withMessage('le champ du prenom ne doit pas être vide')
    .isLength({min:3,max:25})
    .withMessage('le champ du prenom ne doit comporter au moins 3 caractéres')
    .isAlpha().withMessage('le champ du prenom ne doit pas comporter des caracteres spéciaux '),


    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }).withMessage('le password doit contenir au moins 6 caracteres')
]
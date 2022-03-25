const express = require('express');
const mycontrolle = require('../controller/userControl');
const  router = express.Router();
const connection = require('../database/connexion')



router.get('/',mycontrolle.affichageInscriptionGet)
router.post('/',mycontrolle.affichageInscriptionPost)
router.get('/affichage',mycontrolle.selection)


module.exports=router
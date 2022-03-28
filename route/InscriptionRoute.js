const express = require('express');
 const { valida } = require('../requete/validator');
const mycontrolle = require('../controller/userControl');
const  router = express.Router();
const connection = require('../database/connexion')



router.get('/',mycontrolle.affichageInscriptionGet)
router.post('/',valida,mycontrolle. affichageInscriptionPost)



module.exports=router
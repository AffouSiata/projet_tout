const express = require('express');
const mycontrolle = require('../controller/userControl');
const  router = express.Router();
const connection = require('../database/connexion')



router.get('/',mycontrolle.affichageConnexionGet)

router.get('/index',mycontrolle.mapageA)
router.get('/affichage',mycontrolle.mapageB)
   
module.exports=router;
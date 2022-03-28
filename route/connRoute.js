const express = require('express');
const mycontrolle = require('../controller/userControl');
const  router = express.Router();
const connection = require('../database/connexion')



router.get('/',mycontrolle.affichageConnexionGet)
router.post('/',mycontrolle.affichageConnexionPost)

router.get('/index',mycontrolle.mapageAccueil)
router.get('/affichage',mycontrolle.selection)

router.get('/delete/:id', mycontrolle.suppression);



   
module.exports=router;
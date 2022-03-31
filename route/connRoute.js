const express = require('express');
const mycontrolle = require('../controller/userControl');
const  router = express.Router();
const connection = require('../database/connexion')



router.get('/',mycontrolle.affichageConnexionGet)
// router.get('/:azerty',(req,res)=>{
//     res.send(req.params.azerty)
// })

router.post('/',mycontrolle.affichageConnexionPost)

// router.get('/index',mycontrolle.mapageAccueil)
router.get('/affichage',mycontrolle.selection)

  router.get('/token/:id',mycontrolle.envoieto)

router.get('/delete/:id', mycontrolle.suppression);



   
module.exports=router;
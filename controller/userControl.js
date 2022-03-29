const express = require('express');
const router =  express.Router();
const { request,response } = require("express");
const { validationResult } = require('express-validator');
const connection = require('../database/connexion');
const utilisateurs = require('../requete/requet');
var bcrypt = require('bcryptjs');
const mytoken = require('../requete/token');






const mycontrolle = class{



    static affichageConnexionGet = (req=request,res=response)=>{
        if(req.session.utilisateur){
            return res.redirect('/affichage')
        }
        res.render('../views/conn',{alert:null})
    }

    static affichageConnexionPost = (req=request,res=response)=>{
       
       
        utilisateurs.connect(req.body).then(success=>{
            let recuperer = req.body.password 
            let comparaison = bcrypt.compareSync(recuperer,success[0].password);
            // console.log("azertyuiopmlkqwxcvbn",comparaison); 
            if(comparaison){
                res.redirect("/affichage")
            }
            else{
                console.log("vvvvvvvvvvv")
                res.render('conn',{alert:"le mot passe incorrect"})
            }
            // console.log("azertyuishdgsdjsdjb",success);
            let session ={
                email:req.body.email,
                password:req.body.password
            }
            req.session.utilisateur = session
            // console.log('ma session connecté',req.session.utilisateur);
        })
        .catch(error=>{
            res.redirect('/error404')
            console.log("erreur de session",error);
        })
            

            

    }

    static affichageInscriptionGet =(req=request,res=response)=>{
        
        res.render('../views/Inscription',{alert:null})
    }
    
    static mapageAccueil =(req=request,res=response)=>{
        res.render('../views/index')
    }

    static affichageInscriptionPost =(req = request, res = response)=>{
        const erreurs = validationResult(req)
        if(!erreurs.isEmpty()){
            const alert =erreurs.mapped()
            console.log('erreur',alert)
            res.render('Inscription',{
                alert:alert
            })
        }
        else{
            

            var hash = bcrypt.hashSync(req.body.password, 10);
            console.log(hash);
            let user={
                "nom":req.body.nom,
                "prenom":req.body.prenom,
                "email":req.body.email,
                "password": hash,
            }
            
            // console.log(user);
            utilisateurs.insertion(user)
                
                res.redirect('/affichage')

               
            
        }
        
     
    }
    static selection =(req=request,res=response)=>{
    //    if(req.session.utilisateur){
        utilisateurs.sel().then(resultat =>{
            res.render('../views/affichage',{resultat:resultat})
            })
            .catch(error =>{
              res.redirect('/error404')

            })
    //    }
    //    else{
    //        res.redirect('/affichage')
    //    }
      
    }




   static suppression = (req=request,res=response)=>{
       utilisateurs.supprime(req)
       res.redirect('/affichage')
   }
        
    
}
module.exports=mycontrolle;

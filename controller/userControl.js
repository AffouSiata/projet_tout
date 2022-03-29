const express = require('express');
const router =  express.Router();
const { request,response } = require("express");
const { validationResult } = require('express-validator');
const connection = require('../database/connexion');
const utilisateurs = require('../requete/requet');





const mycontrolle = class{



    static affichageConnexionGet = (req=request,res=response)=>{
        if(req.session.utilisateur){
            return res.redirect('/affichage')
        }
        res.render('../views/conn')
    }
    static affichageConnexionPost = (req=request,res=response)=>{
        console.log("ma chance",req.body);
        utilisateurs.connect(req.body).then(success=>{
            let sesion ={
                email:req.body.email,
                password:req.body.password
            }
            req.session.utilisateur=session
            console.log('sfdtsghd',success);
            res.redirect('/affichage')
        })
        .catch(error=>{
            res.redirect('/error404')
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
            
            console.log(req.body);
            utilisateurs.insertion(req.body)
                
                res.redirect('/affichage')

            
        }
        
     
    }
    static selection =(req=request,res=response)=>{
       if(req.session.utilisateur){
        utilisateurs.sel().then(resultat =>{
            res.render('../views/affichage',{resultat:resultat})
            })
            .catch(error =>{
              res.redirect('/error404')

            })
       }
       else{
           res.redirect('/conn')
       }
       
    }
   static suppression = (req=request,res=response)=>{
       utilisateurs.supprime(req)
       res.redirect('/affichage')
   }
        
    
}
module.exports=mycontrolle;

const express = require('express');
const router =  express.Router();
const { request,response } = require("express");
const { validationResult } = require('express-validator');
const connection = require('../database/connexion');
const utilisateurs = require('../requete/requet');
var bcrypt = require('bcryptjs');
const mytoken = require('../requete/token');
const enoiemail = require('../requete/mailer');






const mycontrolle = class{



    static affichageConnexionGet = (req=request,res=response)=>{
        // if(req.session.utilisateur){
            return res.redirect('/affichage')
        // }
        res.render('conn',{alert:null})
    }

    static affichageConnexionPost = (req=request,res=response)=>{
       
       
        utilisateurs.connect(req.body).then(success=>{
            let recuperer = req.body.password 
            
            // cryptage de mot passe//
            
            let comparaison = bcrypt.compareSync(recuperer,success[0].password);
            console.log("azertyuiopmlkqwxcvbn",comparaison); 
            if(comparaison){

                res.redirect("/affichage")

            } else{
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
        
        res.render('Inscription',{alert:null})
    }
    
    

    static affichageInscriptionPost =(req = request, res = response)=>{
        const erreurs = validationResult(req)
        if(!erreurs.isEmpty()){
            const alert =erreurs.mapped()
            // console.log('erreur',alert)
            res.render('Inscription',{
                alert:alert
            })
        }
        else{
            utilisateurs. verifiemonmail(req.body.email).then(resultats=>{
                const autoken = mytoken.creatoken(req.body);
                const envoiemail = enoiemail(req.body.email,autoken)
                res.redirect('/affichage')
            })
            .catch(error=>{
                res.render('Inscription',{alert:error})
                console.log("dfghjklm",error);
            })
        
               
            
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
           res.redirect('/affichage')
       }
      
    }




   static suppression = (req=request,res=response)=>{
       utilisateurs.supprime(req)
       res.redirect('/affichage')
   }



    static envoieto = (req=request,res=response)=>{
       const mail = req.params.id
       console.log("xxxxxxxxxxx",mail);
       const veri = mytoken.verifietoken(mail);
       if(veri.success){
        utilisateurs.insertion(veri)
        res.redirect('/')
       }
       else{
           res.redirect('/Inscription')
       }
       console.log("aaaaaaaaaaa",veri);
     
   }


   // static mapageAccueil =(req=request,res=response)=>{
    //     res.render('../views/index')
    // }
        
    
}
module.exports=mycontrolle;

const express = require('express');
// const  connection  = require('../database/connexion');
const router =  express.Router();
const { request,response } = require("express");
const utilisateurs = require('../requete/requet');





const mycontrolle = class{

    static mapageA =(req=request,res=response)=>{
        res.render('../views/index')
    }
    static mapageB =(req=request,res=response)=>{
        res.render('../views/affichage')
    }
    static affichageConnexionGet = (req=request,res=response)=>{
        res.render('../views/conn')
    }
    static affichageInscriptionGet =(req=request,res=response)=>{
        res.render('../views/Inscription')
    }
    static affichageInscriptionPost =(req = request, res = response)=>{
        console.log(req.body);
        res.redirect('/affichage')
        utilisateurs.insertion(req.body)
     
    }
    static selection =(req=request,res=response)=>{
        
            data.sel().then(resultat =>{
                res.render('affichage',{resultat:resultat})
            })
            .catch(error =>{
              res.redirect('/error404')

            })
    }
        
    
}
module.exports=mycontrolle;


const req = require('express/lib/request');
const res = require('express/lib/response');
const connection = require('../database/connexion');
const  connect  = require('../database/connexion');
const { promiseImpl, resolveInclude } = require('ejs');



const utilisateurs = class{
    static sel = ()=>
    {
        
        connect.query('SELECT * FROM membres', function(error,resultat){
               
            if(error){
                console.log(error);
                reject(error)
                  
            }
            else{
                resolve(resultat)  
            }
            
        })
    }



    static insertion = (data)=>{
        let {nom, prenom, email, password} = data;
        let inserer = "INSERT INTO membres(nom,prenom,email,password)VALUES(?,?,?,?);";

        connection.query(inserer,[nom,prenom,email,password],(error,resultat)=>{
            if(error){
                console.log("erreur",error);
            }
            else{
                console.log("bien enregistré",resultat);
            }
        })

    }
    
}
module.exports = utilisateurs;
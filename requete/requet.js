
const req = require('express/lib/request');
const res = require('express/lib/response');
const connection = require('../database/connexion');
const  connect  = require('../database/connexion');
const { promiseImpl, resolveInclude } = require('ejs');



const utilisateurs = class{
    static sel = ()=>
    {
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM membres`, function(error,resultat){
               console.log("qsdfghjklm",resultat);
                if(error){
                    console.log(error);
                    reject(error)
                      
                }
                else{
                    resolve(resultat)  
                }
                
            })
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

    static connect =(data)=>{
        return new Promise((resolve,reject)=>{
            let{email,password} =data
            console.log("reponvtyh",data);
            connection.query('SELECT * FROM membres  WHERE email= ? and password=?',[email,password],function(error,resultat){

                if(error){
                    reject(error)
                    
                }
                else{
                    resolve(resultat)
                }
        })
        })
        

    }


    static supprime =(req)=>{
        const id =req.params.id
        connection.query("DELETE FROM membres WHERE id=? ",[id],(error,resultat)=>{
            if(error){
                return error;

            }
            else{
                return resultat
            }
        })
    }
    
}
module.exports = utilisateurs;

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
            //    console.log("qsdfghjklm",resultat);
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
         let {nom, prenom, email, password} = data.success;
         console.log("mmmmmmm",data);
         console.log("nnnnnnnn",data.success.nom);
        let inserer = "INSERT INTO membres(nom,prenom,email,password)VALUES(?,?,?,?);";
        // let verifie ="SELECT * FROM membres WHERE email=? and password =?";

            connection.query(inserer,[nom,prenom,email,password],(error,resultat)=>{
                if(error){
                     console.log(error)
                }
                else{
                     console.log(resultat);
                }
            })
        
        
    }

    static connect =(data)=>{
        return new Promise((resolve,reject)=>{
            let{email} =data
            connection.query('SELECT * FROM membres  WHERE email= ?',[email],function(error,resultat){

                if(error){
                    reject(error)
                    
                }
                else{
                    console.log("azertyuyutre",resultat);
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
    static verifiemonmail =(req)=>{
        console.log("rrrrrrrrrrr",req);
   
        return new Promise((resolve,reject)=>{
            let verifie ="SELECT * FROM membres WHERE email=?";
            connection.query(verifie,[req],(error,resultats)=>{
                console.log("mlkjhgfd",resultats);
                if(resultats == ''){
                    
                    resolve({message:' inscription reussie '})
                    
                }
                else{
                    reject({message:"email exist déja"}) ;
                }
            })
            
        })
       
    }
    
    
}
module.exports = utilisateurs;
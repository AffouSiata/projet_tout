
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
        let {nom, prenom, email, password} = data;
        let inserer = "INSERT INTO membres(nom,prenom,email,password)VALUES(?,?,?,?);";
        let verifie ="SELECT * FROM membres WHERE email=? and password =?";

        return new Promise((resolve,reject)=>{
            connection.query(verifie,[email,password],function(error,resultat){
                if(resultat ==""){
                    connection.query(inserer,[nom,prenom,email,password],(error,resultat)=>{
                        if(error){
                           reject(error);
                        }
                        else{
                           resolve(resultat);
                        }
                    })
                }
                else{
                  reject({message:"email exist déja"});
                }
                
                
            })
        })
        

        

    }

    static connect =(data)=>{
        return new Promise((resolve,reject)=>{
            let{email} =data
            console.log("reponvtyh",data);
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
    
    
}
module.exports = utilisateurs;
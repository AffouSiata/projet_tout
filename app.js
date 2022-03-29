const express =require('express')
const app = express()
const inscrip = require('./route/InscriptionRoute')
const router = require('./route/connRoute')
const  session  =  require ( 'express-session' );
const bdd = require('./database/connexion')


    bdd.connect((error)=>{
        if(error){
            console.log("Connexion echoué");
        }
        else{
            console.log("Connexion reussie");


            app.use(session({
                secret:'keyboard cat',
                resave:false,
                saveUninitialized: true,
                cookie:{maxAge:60000000}
            }))
            
            app.use(express.json())
            app.use(express.urlencoded({extended:true}))

            app.set('views','./views')   
            app.set('view engine','ejs') 
            app.use('/public',express.static('public'))


            app.use('/',router)
            app.use('/Inscription',inscrip)


        }
        
        
    })

           

app.listen(2000,()=>console.log(`listening on port  2000`));

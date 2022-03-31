const bcrypt = require('bcryptjs/dist/bcrypt');
var jwt = require('jsonwebtoken');


const mytoken = class{
    static creatoken=(req)=>{
        var hash = bcrypt.hashSync(req.password, 10);
        let user={
            "nom":req.nom,
            "prenom":req.prenom,
            "email":req.email,
            "password": hash,
        }
        
       
            let token = jwt.sign(user,"anNvbnRva2Vu"); 
            return token 
            console.log("montoken",token)
        

    }
    static verifietoken =(token)=>{
        console.log("gdshwdhhsw",token);
        try{
            const verification =   jwt.verify(token, "anNvbnRva2Vu") 
            console.log("token verifie",verification);  
        }
        catch {
            console.log("token invalid")
        }
    }

}
module.exports=mytoken;



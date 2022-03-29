const jwt = require("express-jwt");

const mytoken = class{
    static creatoken=(req)=>{
        let util={
            email:req.email,
            password:req.password
        }
        let token = jwt.sign(util,"anNvbnRva2Vu")
        console.log("montoken",token);
        return token

    }

}
module.exports=mytoken;

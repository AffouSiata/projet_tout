const nodemailer = require("nodemailer");





function mailenvoie (envoiemail,token) {
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'koneafsa8@gmail.com',
            pass: 'Afsa2000#'
        }
    });
    let lien = `http://localhost:2000/token/${token}`

    let info =  {
        from:  'koneafsa8@gmail.com', 
        to: envoiemail, 
        subject: "Salut✔", 
        text: "Bienvenue sur mon site?",
        html: `<p>Bienvenue sur mon site?</p> 
        <a href="${lien}" > confirmation de votre email</a>`
        
    }

        
    
    transporter.sendMail(info, function(error, info){
        if (error) {
          console.log("erreur de mon mail",error);
        } else 
          console.log('Email sent: ' + info.response);
        })
    };
module.exports = mailenvoie;
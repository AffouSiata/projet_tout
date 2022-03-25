
let mysql =require('mysql');
let connection = mysql.createConnection({
    host:'192.168.64.2',
    user:'Affou',
    password:'12345',
    database:'projet_tout'
})
module.exports=connection;
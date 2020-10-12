// Creating tables in the mySQL server

const mysql = require('mysql');
require('dotenv').config();


var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.username,
  port: process.env.PORT,
  password: process.env.password,
  database: process.env.database
  
});


con.connect(function(err) {
  if (err) throw err;


  for(var i = 2000; i <= 2021; i++){

    var sql = "CREATE TABLE holidays" + i +" (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), country VARCHAR(255), date VARCHAR(255), type VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");

    });

  }



});

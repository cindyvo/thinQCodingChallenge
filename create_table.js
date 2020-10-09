// Creating tables in the mySQL server

const mysql = require('mysql');

//new username bd279b35413a9b
//new password 4daa6363
//database URL mysql://bd279b35413a9b:4daa6363@us-cdbr-east-02.cleardb.com/heroku_6d73b950ea37501?reconnect=true
//new host us-cdbr-east-02.cleardb.com
//new name heroku_6d73b950ea37501

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password123",
  database: "mydb"
});

// var con = mysql.createConnection({
//   host: "us-cdbr-east-02.cleardb.com",
//   user: "bd279b35413a9b",
//   port: 3306,
//   password: "4daa6363",
//   database: "heroku_6d73b950ea37501"
// });
con.connect(function(err) {
  if (err) throw err;


  for(var i = 2000; i <= 2021; i++){

    var sql = "CREATE TABLE holidays" + i +" (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), country VARCHAR(255), date VARCHAR(255), type VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created",i);

    });

  }



});

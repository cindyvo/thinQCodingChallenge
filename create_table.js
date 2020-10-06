// Creating a table in the mySQL server

const mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password123",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "CREATE TABLE holidays (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), country VARCHAR(255), date VARCHAR(255), type VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

});

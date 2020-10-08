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


  var sql = "ALTER TABLE holidays \n DROP COLUMN description;";
  con.query(sql, function (err, result) {
    if (err) throw err;

  });

});

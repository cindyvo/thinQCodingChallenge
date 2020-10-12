//Deleting tables in the mySQL Server
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

  for(var year = 2000; year <= 2021; year++) {

    var sql = "DROP TABLE holidays" +year+";";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");

    });


  }
  console.log("All tables deleted");

});

//Deleting tables in the mySQL Server
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

  for(var year = 2000; year <= 2021; year++) {

    var sql = "DROP TABLE holidays" +year+";";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");

    });


  }
  console.log("All tables deleted");

});

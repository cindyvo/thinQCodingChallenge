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

  var sql = "DROP TABLE holidays;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Column deleted");
  });

});

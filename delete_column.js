// Deleting a specific column

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


  var sql = "ALTER TABLE holidays \n DROP COLUMN description;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Column deleted");
  });

});

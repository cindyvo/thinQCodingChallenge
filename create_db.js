// (SET UP) Establishing a connection with mySQL Server for the first time and creating a database

const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password123",
});

con.connect(function(err) {
  if (err) throw err;
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
  });
});

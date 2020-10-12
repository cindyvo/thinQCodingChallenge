// (SET UP) Establishing a connection with mySQL Server for the first time and creating a database

const mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.username,
  port: process.env.PORT,
  password: process.env.password,
});

con.connect(function(err) {
  if (err) throw err;
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
  });
});

const express = require("express");
const app = express();
const http = require("http");
const https = require('https');
const mysql = require('mysql');



const options = {
  hostname: 'calendarific.com',
  path: '/api/v2/holidays?api_key=183e14057605ed02d97ea1672ba509a1a17335a0&country=US&year=2019',
  port: 443,
  method: 'GET'
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  });
});

req.on('error', error => {
  console.error(error)
});

req.end();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on *:3000');
});

var con = mysql.createConnection({
  host: "localhost:3306",
  user: "root",
  password: "puppy123",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  var sql = "CREATE TABLE holidays (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255)), country VARCHAR(255), date VARCHAR(255), type VARCHAR(255), locations VARCHAR(255), states VARCHAR(255)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

});

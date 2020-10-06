const express = require("express");
const app = express();
const http = require("http");
const https = require('https');
const mysql = require('mysql');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on *:3000');
});


const options = {
  hostname: 'calendarific.com',
  path: '/api/v2/holidays?api_key=183e14057605ed02d97ea1672ba509a1a17335a0&country=US&year=2019',
  port: 443,
  method: 'GET'
};

var written = "";

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    written += d;

  });
});

req.on('error', error => {
  console.error(error)
});

req.end();


function parseData(obj) {
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

    for(let holiday of obj.response.holidays) {

      var name = (holiday.name).replace(new RegExp("'", 'g'), "");
      name = "'"+name+"'";
      var country = "'"+holiday.country.name+"'";
      var date = "'"+holiday.date.iso+"'";
      var type = "'"+holiday.type+"'";
      var locations = "'"+holiday.location+"'";

      var sql = "INSERT INTO holidays (name, country, date, type) VALUES (" + name + ", " + country + ", " + date + ", " + type + ")";
      con.query(sql, function (err, result) {
        if (err) throw err;

      });

    }

  });


};

var obj = null;

setTimeout(function () {obj = JSON.parse(written);}, 3000);

setTimeout(function () {parseData(obj)}, 5000);

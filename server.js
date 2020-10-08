const express = require("express");
const app = express();
const http = require("http");
const https = require('https');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
server.listen(3000);

const mysql = require('mysql');

const Promise = require('promise');
const fetch = require("node-fetch");

const fs = require('fs');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.use('/static', express.static('node_modules'));

io.on('connection', function(socket) {

  socket.on("load", function() {
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

      var sql = "SELECT * FROM holidays";
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update", result);

      });

    });

  });

});


// app.listen(process.env.PORT || 3000, function() {
//   console.log('listening on *:3000');
// });

  // var written = "";
  // const options = {
  //   hostname: 'calendarific.com',
  //   path: '/api/v2/holidays?api_key=183e14057605ed02d97ea1672ba509a1a17335a0&country=US&year=2019',
  //   port: 443,
  //   method: 'GET'
  // };
  // const req = https.request(options, res => {
  //   console.log(`statusCode: ${res.statusCode}`);
  //
  //   res.on('data', d => {
  //     written += d;
  //
  //   });
  // });
  //
  // req.on('error', error => {
  //   console.error(error)
  // });
  //
  // req.end();
  // return written;



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

    var setNames = new Set();
    for(let holiday of obj.response.holidays) {
      var name = (holiday.name).replace(new RegExp("'", 'g'), "");
      name = "'"+name+"'";
      if(!setNames.has(name)) {
        setNames.add(name);
        var country = "'"+holiday.country.name+"'";
        var date = "'"+holiday.date.iso+"'";
        var type = "'"+holiday.type+"'";
        var locations = "'"+holiday.location+"'";

        var sql = "INSERT INTO holidays (name, country, date, type) VALUES (" + name + ", " + country + ", " + date + ", " + type + ")";
        con.query(sql, function (err, result) {
          if (err) throw err;

        });

      }


    }

  });

};


// const fetchPromise = fetch("https://calendarific.com/api/v2/holidays?api_key=183e14057605ed02d97ea1672ba509a1a17335a0&country=US&year=2019");
// fetchPromise.then(response => {
// return response.json();
// })
// .then(function(result){
//
//   return JSON.parse(JSON.stringify(result));
// })
// .then(function(newResult) {
//   parseData(newResult);
// });

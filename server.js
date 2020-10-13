const express = require("express");
const app = express();
const http = require("http");
const https = require('https');
const server = http.createServer(app);
server.listen(process.env.PORT || 3000);
const io = require('socket.io').listen(server);
const mysql = require('mysql');
const Promise = require('promise');
const fetch = require("node-fetch");

require('dotenv').config()

var monthHash = {"January":"01","February":"02","March":"03","April":"04","May":"05","June":"06","July":"07","August":"08","September":"09","October":"10","November":"11","December":"12"};

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.use('/static', express.static('node_modules'));

io.on('connection', function(socket) {

  //"global" pool variable that keeps track of how many connections to the database are allowed at a time
  var pool;

  //gets data for the initialization of the webpage and passes it
  socket.on("load", function() {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database

    });



    pool.getConnection(function(err, con){
      var sql = "SELECT * FROM holidays2020";
      con.query(sql, function (err, result) {
        con.release();
        if (err) throw err;
        socket.emit("update", result);
      });

    });
  });

  //gets records for holidays of that year and passes them
  socket.on("get-year", function(year) {
    var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database

    });
    pool.getConnection(function(err,con){
      var sql = "SELECT * FROM holidays"+year;
      con.query(sql, function (err, result) {
        con.release();
        if (err) throw err;
        socket.emit("update-year", result);
      });

    });

  });


  //gets records for that month of the current year and passes them
  socket.on("get-month", function(month, year) {

    var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database

    });

    pool.getConnection(function(err,con){
      var sql;
      if(month == "All"){
          sql = "SELECT * FROM holidays"+year;
      }
      else{
        sql = "SELECT * FROM holidays"+year+" WHERE date LIKE '_____"+monthHash[month]+"%'";
      }
      con.query(sql, function (err, result) {
        con.release();
        if (err) throw err;
        socket.emit("update-month", result);

      });
    });

  });

  //gets records of that type of the given year and passes them
  socket.on("get-type", function(type, year) {

    var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database

    });

    pool.getConnection(function(err, con){
      var sql;

      if(type == "All"){
        sql = "SELECT * FROM holidays"+year;
      }
      else{
        sql = "SELECT * FROM holidays"+year+" WHERE type LIKE '%"+type+"%'";
      }

      con.query(sql, function (err, result) {
        con.release();
        if (err) throw err;
        socket.emit("update-type", result);
      });

    });

  });

  //
  socket.on("get-inputStr", function(inputStr, year) {

    var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database

    });

    pool.getConnection(function(err,con){
      var sql = "SELECT * FROM holidays"+year;
      con.query(sql, function (err, result) {
        con.release();
        if (err) throw err;
        socket.emit("update-name", result, inputStr);
      });
    });

  });

  socket.on("wiki-data", function(holiday) {

    if(holiday.includes(" ")){
      holidayArr = holiday.split(" ");
      holiday = "";
      for(var i = 0; i < holidayArr.length; i++) {
        if(i == holidayArr.length - 1) {
          holiday = holiday + holidayArr[i];
        } else {
          holiday = holiday + holidayArr[i] + "%20";

        }

      }
    }
    console.log(holiday);
    var stringSearch = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + holiday;

    fetch(stringSearch).then(response => {
      if(response.status != 200){
        socket.emit("update-wiki", "Could not connect to Wiki API!", -100);
      }

      return response.json();
    })
    .then(function(result){
      // var title = result.query.search[0].title;
      // if(title.includes(" ")) {
      //   var titleArr = title.split(" ");
      //   title = "";
      //   for(var i = 0; i < titleArr.length; i++){
      //
      //     if(i == titleArr.length - 1) {
      //       title = title + titleArr[i];
      //     } else {
      //       title = title + titleArr[i] + "%20";
      //
      //     }
      //
      //   }
      //
      // }
      //
      // var titleString = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&list=&titles=" + title
      // fetch(titleString).then(response => {
      //   if(response.status != 200){
      //     console.log("We could not access the API. Please try again or check the status of the API.");
      //     return;
      //   }
      //   return response.json();
      // })
      // .then(function(result){
      //
      //   return JSON.parse(JSON.stringify(result));
      // })
      // .then(function(newResult) {
      //   parseData(newResult, year);
      // }).catch(error => console.log(error))



        var htmlString = result.query.search[0].snippet;
        var pageId = result.query.search[0].pageid;
        console.log(htmlString);
        console.log(pageId);
        socket.emit("update-wiki", htmlString, pageId);



    }).catch(error => console.error(error));

  });

});

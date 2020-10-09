const express = require("express");
const app = express();
const http = require("http");
const https = require('https');
const server = http.createServer(app);
server.listen(process.env.PORT || 3000);
const io = require('socket.io').listen(server);
//new username bd279b35413a9b
//new password 4daa6363
//database URL mysql://bd279b35413a9b:4daa6363@us-cdbr-east-02.cleardb.com/heroku_6d73b950ea37501?reconnect=true
//new host us-cdbr-east-02.cleardb.com
//new name heroku_6d73b950ea37501

var monthHash = {"January":"01","February":"02","March":"03","April":"04","May":"05","June":"06","July":"07","August":"08","September":"09","October":"10","November":"11","December":"12"};

const mysql = require('mysql');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.use('/static', express.static('node_modules'));

io.on('connection', function(socket) {

  socket.on("load", function() {
    var con = mysql.createConnection({
      // host: "localhost",
      // user: "root",
      // port: 3306,
      // password: "password123",
      // database: "mydb"
      host: "us-cdbr-east-02.cleardb.com",
      user: "bd279b35413a9b",
      port: 3306,
      password: "4daa6363",
      database: "heroku_6d73b950ea37501"
    });

    con.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM holidays2020";
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update", result);

      });

    });

  });

  socket.on("get-year", function(year) {
    var con = mysql.createConnection({
      // host: "localhost",
      // user: "root",
      // port: 3306,
      // password: "password123",
      // database: "mydb"
      host: "us-cdbr-east-02.cleardb.com",
      user: "bd279b35413a9b",
      port: 3306,
      password: "4daa6363",
      database: "heroku_6d73b950ea37501"
    });

    con.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM holidays"+year;
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update-year", result);

      });

    });

  });

  socket.on("get-month", function(month, year) {

    var con = mysql.createConnection({
      // host: "localhost",
      // user: "root",
      // port: 3306,
      // password: "password123",
      // database: "mydb"
      host: "us-cdbr-east-02.cleardb.com",
      user: "bd279b35413a9b",
      port: 3306,
      password: "4daa6363",
      database: "heroku_6d73b950ea37501"
    });

    con.connect(function(err) {
      if (err) throw err;
      var sql;
      if(month == "All"){
          sql = "SELECT * FROM holidays"+year;
      }
      else{
        sql = "SELECT * FROM holidays"+year+" WHERE date LIKE '_____"+monthHash[month]+"%'";
      }
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update-month", result, month);

      });

    });

  });

  socket.on("get-type", function(type, year) {

    var con = mysql.createConnection({
      // host: "localhost",
      // user: "root",
      // port: 3306,
      // password: "password123",
      // database: "mydb"
      host: "us-cdbr-east-02.cleardb.com",
      user: "bd279b35413a9b",
      port: 3306,
      password: "4daa6363",
      database: "heroku_6d73b950ea37501"
    });

    con.connect(function(err) {
      if (err) throw err;
      var sql;

      if(type == "All"){
        sql = "SELECT * FROM holidays"+year;
      }
      else{
        sql = "SELECT * FROM holidays"+year+" WHERE type LIKE '%"+type+"%'";
      }

      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update-type", result, type);

      });

    });

  });

  socket.on("get-inputStr", function(inputStr, year) {

    var con = mysql.createConnection({
      // host: "localhost",
      // user: "root",
      // port: 3306,
      // password: "password123",
      // database: "mydb"
      host: "us-cdbr-east-02.cleardb.com",
      user: "bd279b35413a9b",
      port: 3306,
      password: "4daa6363",
      database: "heroku_6d73b950ea37501"
    });

    con.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM holidays"+year;
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update-name", result, inputStr);

      });

    });

  });

});

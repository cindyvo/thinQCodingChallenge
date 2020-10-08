const express = require("express");
const app = express();
const http = require("http");
const https = require('https');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
server.listen(3000);

const mysql = require('mysql');

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

      var sql = "SELECT * FROM holidays";
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update", result);

      });

    });

  });

  socket.on("get-month", function(month) {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "password123",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM holidays";
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update-month", result, month);

      });

    });

  });

  socket.on("get-type", function(type) {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "password123",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM holidays";
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update-type", result, type);

      });

    });

  });

  socket.on("get-inputStr", function(inputStr) {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "password123",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM holidays";
      con.query(sql, function (err, result) {
        if (err) throw err;
          socket.emit("update-name", result, inputStr);

      });

    });

  });

});

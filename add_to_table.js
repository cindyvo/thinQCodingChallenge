const mysql = require('mysql');

const Promise = require('promise');
const fetch = require("node-fetch");

function parseData(obj, year) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "password123",
    database: "mydb"
    // host: "us-cdbr-east-02.cleardb.com",
    // user: "bd279b35413a9b",
    // port: 3306,
    // password: "4daa6363",
    // database: "heroku_6d73b950ea37501"
  });

  con.connect(function(err) {
    if (err) throw err;

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

        var sql = "INSERT INTO holidays" + year + " (name, country, date, type) VALUES (" + name + ", " + country + ", " + date + ", " + type + ")";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("add to table")

        });

      }


    }

  });

};

//asynchronous code for accessing a public API
//had to add in increments of 5
//could update this by using the pool, but because this was used once, there was less of a need to use the pool
(async function loop() {
    for (let year = 2000; year <= 2021; year++) {
      await fetch("https://calendarific.com/api/v2/holidays?api_key=183e14057605ed02d97ea1672ba509a1a17335a0&country=US&year=" + year).then(response => {
        return response.json();
      })
      .then(function(result){
        return JSON.parse(JSON.stringify(result));
      })
      .then(function(newResult) {
        parseData(newResult, year);
      });
    }
})();

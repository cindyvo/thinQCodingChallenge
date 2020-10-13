const mysql = require('mysql');

const Promise = require('promise');
const fetch = require("node-fetch");
require('dotenv').config();

var host = "https://calendarific.com/";
var path = "api/v2/holidays?";
var api_key = "api_key="+process.env.calendarapikey;
var search_params = "&country=US&year=";

function parseData(obj, year) {
  var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: process.env.PORT,
    password: process.env.password,
    database: process.env.database

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
      await fetch(host + path + api_key+ search_params + year).then(response => {
        return response.json();
      })
      .then(function(result){
        if(result.statusCode != "200"){
          console.log("Unable to reach the API. Please try again or check it out.");
        }
        return JSON.parse(JSON.stringify(result));
      })
      .then(function(newResult) {
        parseData(newResult, year);
      });
    }
})();

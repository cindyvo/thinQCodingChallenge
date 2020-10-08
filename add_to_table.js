const mysql = require('mysql');

const Promise = require('promise');
const fetch = require("node-fetch");

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

const fetchPromise = fetch("https://calendarific.com/api/v2/holidays?api_key=183e14057605ed02d97ea1672ba509a1a17335a0&country=US&year=2019");
fetchPromise.then(response => {
  return response.json();
})
.then(function(result){
  return JSON.parse(JSON.stringify(result));
})
.then(function(newResult) {
  parseData(newResult);
});
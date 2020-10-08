import {mysql} from 'mysql';
const fs = require('fs');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
function getFromSQL(callback) {
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

      addToUI(result);

    });

  });

}

function addToUI(arg) {
  var htmlSource = fs.readFileSync("index.html", "utf8");
  for(obj of arg) {
    $("#container").children().eq(2).append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + obj.date + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>")

  }

}

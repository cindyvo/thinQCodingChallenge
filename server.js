const express = require("express");
const app = express();
const http = require("http");
var request = require('request');


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on *:3000');
});

request('https://superheroapi.com/api/3592560490806532', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})

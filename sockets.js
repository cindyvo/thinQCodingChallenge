
const socket = io();

  socket.emit('load');
  socket.on("update", function(data) {

    for(obj of data) {
      var dateString = convertISOtoDate(obj.date);
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    }

  });

function convertISOtoDate(isoString) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date = new Date(obj.date);
  month = date.getMonth();
  dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }

  return months[month] + " " + dt;

}

$(document).ready(function(){
    $("#monthsSelect").change(function(){
        var selectedMonth = $(this).children("option:selected").text();
        socket.emit("get-month", selectedMonth);
    });

    $("#typesSelect").change(function(){
        var selectedType = $(this).children("option:selected").text();
        socket.emit("get-type", selectedType);
    });
});

socket.on("update-month", function(data, month){
  $("#toAdd").empty();

  for(obj of data) {
    var dateString = convertISOtoDate(obj.date);
    var dateArr = dateString.split(" ");

    if(dateArr[0] == month){
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    } else if(month == "All") {
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    }
  }
});

socket.on("update-type", function(data, type){
  $("#toAdd").empty();
  console.log(type);
  for(obj of data) {
    var dateString = convertISOtoDate(obj.date);
    if((obj.type).includes(type)){
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    } else if(type == "All") {
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    }
  }
});

socket.on("update-name", function(data, inputStr){
  $("#toAdd").empty();
  console.log(inputStr);
  for(obj of data) {
    if((obj.name).toLowerCase().includes(inputStr.toLowerCase())){
      var dateString = convertISOtoDate(obj.date);
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    }
  }

});

function nameButtonClicked() {
  var inputStr = $("#inputStr").val();
  socket.emit("get-inputStr", inputStr);
}

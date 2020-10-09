
const socket = io();

var year = 2020;

function convertISOtoDate(isoString) {
  var monthHash = {"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September","10":"October","11":"November","12":"December"};
  return monthHash[isoString.substring(5,7)] + " " + isoString.substring(8,10);

}

function nameButtonClicked() {
  var inputStr = $("#inputStr").val();
  socket.emit("get-inputStr", inputStr, year);
}



  socket.emit('load');
  socket.on("update", function(data) {

    for(obj of data) {
      var dateString = convertISOtoDate(obj.date);
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    }

  });

  socket.on("update-year", function(data) {

    //removes table data
    $("#toAdd").html("");

    //resets tabs to normal state
    $("#nav-name-tab").attr("aria-selected", "true");
    $("#nav-name-tab").addClass("active");
    $("#nav-name").addClass("active show");

    $("#nav-month-tab").attr("aria-selected", "false");
    $("#nav-month-tab").removeClass("active");
    $("#nav-month").removeClass("active show");

    $("#nav-type-tab").attr("aria-selected", "false");
    $("#nav-type-tab").removeClass("active");
    $("#nav-type").removeClass("active show");

    //adds new year data
    for(obj of data) {
      var dateString = convertISOtoDate(obj.date);
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    }

  });


$(document).ready(function(){
    $("#monthsSelect").change(function(){
        var selectedMonth = $(this).children("option:selected").text();
        socket.emit("get-month", selectedMonth, year);
    });

    $("#typesSelect").change(function(){
        var selectedType = $(this).children("option:selected").text();
        socket.emit("get-type", selectedType, year);
    });

    $("#yearStr").on('keypress',function(e) {
      if(e.which == 13) {
          year = $("#yearStr").val();
          console.log(year);
          $("#yearStr").val(year);
          $("header").html("Table of US Holidays in " + year);
          socket.emit('get-year', year);
          return false;
      }
    });

   $("#inputStr").on('keydown', function(e){
     //don't reload page on enter
     if(e.keyCode == 13){
       return false;
     }
   });

   $("#inputStr").on("keyup",function(e){
     //get the value currently typed
     var inputStr = $("#inputStr").val();
     //if there's nothing, query everything again
     if(inputStr !=""){
       socket.emit("get-inputStr", inputStr, year);
     }

   });

});

socket.on("update-month", function(data, month){
  $("#toAdd").empty();

  console.log(month);
  console.log(data);
  for(obj of data) {
    var dateString = convertISOtoDate(obj.date);

    // if(dateArr[0] == month){
      // $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    // } else if(month == "All") {
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    // }
  }
});

socket.on("update-type", function(data, type){
  $("#toAdd").empty();
  console.log(type);
  for(obj of data) {
    var dateString = convertISOtoDate(obj.date);
    // if((obj.type).includes(type)){
      // $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    // } else if(type == "All") {
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    // }
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

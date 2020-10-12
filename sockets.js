const socket = io();

const UPDATE_YEAR = 0;
const UPDATE_NAME = 1;
const UPDATE_MONTH = 2;
const UPDATE_TYPE = 3;
const UPDATE = 4;
const VALIDATE_NAME = 5;
const VALIDATE_YEAR = 6;

//global year variable to keep track of current year
var year = 2020;

//function that converts an iso string to a more human readable date string
function validateString(inputStr, validate){
  if(inputStr.slice(-1) == "\n") {
    inputStr = inputStr.slice(0, -1);
  }

  if(validate == VALIDATE_NAME) {

    var re = /^[A-Za-z0-9]+$/;
    if(!(inputStr.match(re))) {
      if(!(inputStr.includes("\b"))) {
        if(!(inputStr.includes("\s"))){
          if(inputStr != "") {
            $("#inputStr").addClass("is-invalid");
            $("#invalidName").css("visibility", "visible");
            return true;

          }

        }
      }
    }

  }  else {
    if(Number.isNaN(Number(inputStr))) {
      $("#yearStr").addClass("is-invalid");
      $("#invalidYear").css("visibility", "visible");
      return true;
    } else if(parseInt(inputStr) < 2000 || parseInt(inputStr) > 2021){
      $("#yearStr").addClass("is-invalid");
      $("#invalidYear").css("visibility", "visible");
      return true;

    }

  }

  if(inputStr == "") {
    $("#inputStr").removeClass("is-invalid");
    $("#invalidName").css("visibility", "hidden");
  }

  return false;


}

function convertISOtoDate(isoString) {
  var monthHash = {"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September","10":"October","11":"November","12":"December"};
  return monthHash[isoString.substring(5,7)] + " " + isoString.substring(8,10);
}

function nameButtonClicked() {
  var inputStr = $("#inputStr").val();

  while(validateString(inputStr, VALIDATE_NAME)) {
    var inputStr = $("#inputStr").val();
  }

  socket.emit("get-inputStr", inputStr, year);
}

function addToHTML(data, update, inputStr) {

  if(update == UPDATE_YEAR) {

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

  } else if(update == UPDATE_NAME){

    $("#toAdd").empty();
    for(obj of data) {
      if((obj.name).toLowerCase().includes(inputStr.toLowerCase())){
        var dateString = convertISOtoDate(obj.date);
          $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");

      }

    }

  } else {

    $("#toAdd").empty();
    for(obj of data) {
      var dateString = convertISOtoDate(obj.date);
        $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + dateString + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    }

  }

}

  //when the document is loaded, send this signal to start the initialization of the web page
  socket.emit('load');

  //keeps track of changes on the webpage
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

            if(validateString(year, VALIDATE_YEAR)) {
              $("#yearStr").val(year);
              return false;
            } else {
              $("#yearStr").removeClass("is-invalid");
              $("#invalidYear").css("visibility", "hidden");
              $("header").html("Table of US Holidays in " + year);
              $("#yearStr").val(year);
              socket.emit('get-year', year);
              return false;
            }

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

       if(validateString(inputStr, VALIDATE_NAME)) {
          return;
       }

       //if there's nothing, query everything again
       if(inputStr !=""){
         $("#inputStr").removeClass("is-invalid");
         $("#invalidName").css("visibility", "hidden");
         socket.emit("get-inputStr", inputStr, year);
       }

       if(inputStr == "") {
         $("#inputStr").removeClass("is-invalid");
         $("#invalidName").css("visibility", "hidden");
         socket.emit("get-inputStr", inputStr, year);
       }
     });

  });

  //inital update
  socket.on("update", function(data) {

    addToHTML(data, UPDATE);

  });

  //if the year is updated, then we reinitialize the web page with information of that year
  socket.on("update-year", function(data) {

    addToHTML(data, UPDATE_YEAR);

  });

//when we receive the signal that we need to change, then the html will change accordingly
socket.on("update-month", function(data){

  addToHTML(data, UPDATE_MONTH);

});

socket.on("update-type", function(data){

  addToHTML(data, UPDATE_TYPE);

});

socket.on("update-name", function(data, inputStr){

  addToHTML(data, UPDATE_NAME, inputStr);

});

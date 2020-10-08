
const socket = io();

  console.log("Here2");
  socket.emit('load');
  socket.on("update", function(data) {

    for(obj of data) {
      $("#toAdd").append("<tr> <th scope='col'>" + obj.name + "</th>" + "<th scope='col'>" + obj.date + "</th>" + "</th>" + "<th scope='col'>" + obj.type + "</th>" + "</tr>");
    }

  });

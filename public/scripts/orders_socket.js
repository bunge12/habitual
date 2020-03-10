$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function(data) {
    console.log(data); // some jQuery
  });
});

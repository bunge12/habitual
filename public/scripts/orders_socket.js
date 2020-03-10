$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function(data) {
    if (data.status === "pending") {
      $.ajax({
        type: "GET",
        url: "/orders"
      }).then(() => {
        $("#body").load("#body");
      });
    }
  });
});

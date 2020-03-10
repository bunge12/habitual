$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function (data) {
    if (data.status === "pending") {
      location.reload();
    }
  });
});

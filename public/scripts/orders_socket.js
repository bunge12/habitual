$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function (data) {
    if (data.status === "pending") {
      $.ajax('/orders', { method: 'GET' })
        .then(function (data) {

          $(document.body).replaceWith(data);
        });
    }
  });
});

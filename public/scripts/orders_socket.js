$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function (data) {
    if (data.status === "pending") {
      // $.ajax({
      //   type: "GET",
      //   url: "/orders"
      // }).then(() => {
      //   $("#body").load("#body");
      // });

      $.ajax('/orders', { method: 'GET' })
        .then(function (data) {
          // let item = data[data.length - 1];
          // $(document.body).remove();
          $(document.body).replaceWith(data);
        });


    }
  });
});

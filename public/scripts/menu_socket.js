$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function(data) {
    if (data.status === "accepted") {
      $("#cart_header").html(`Ready in ${data.waitTime} min`);
      $("#submit_order")
        .html("Order Accepted!")
        .addClass("btn btn-success text-white");
    }
    if (data.status === "cancelled") {
      $("#cart_header").html("Your order is cancelled.");
      $("#submit_order")
        .html("Order Cancelled.")
        .addClass("btn btn-danger text-white");
    }
  });
});

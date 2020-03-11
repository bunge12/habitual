$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function(data) {
    if (data.status === "accepted") {
      $("#cart_header").html(`Ready in ${data.waitTime} minutes!`);
      $("#submit_order")
        .html("Order Accepted!")
        .removeClass("btn btn-warning")
        .addClass("btn btn-success");
    }
    if (data.status === "cancelled") {
      $("#cart_header").html("Your order has been cancelled.");
      $("#submit_order")
        .html("Order Cancelled.")
        .addClass("btn btn-danger text-white");
    }
    if (data.status === "completed") {
      $("#cart_header").html("Your order is ready!");
      $("#submit_order")
        .html("Order Completed.")
        .addClass("btn btn-info text-white");
    }
  });
});

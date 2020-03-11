$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function(data) {
    if (data.status === "accepted") {
      const makeTimer = function(completeTime) {
        let timeLeft = (completeTime - Date.now()) / 1000;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = Math.floor(timeLeft - minutes * 60);

        if (minutes < "10") {
          minutes = "0" + minutes;
        }
        if (seconds < "10") {
          seconds = "0" + seconds;
        }
        let str = `${minutes} min ${seconds} sec.`;

        $("#cart_header").html(`Ready in  ${str}`);

        if (timeLeft < 0) {
          clearInterval(intervalId);
          $("#cart_header").html("Your order is ready to pick up!");
          $("#cart_header").append(`<audio id="orderReadySound">
          <source src="audio/alert1.mp3" type="audio/mpeg">
          </audio>
          `);
          $("audio#orderReadySound")[0].play();
        }
      };

      const completeTime = Date.now() + data.waitTime * 60 * 1000;

      const intervalId = setInterval(function() {
        makeTimer(completeTime);
      }, 1000);

      $("#submit_order")
        .html("Order Accepted!")
        .removeClass("btn btn-warning")
        .addClass("btn btn-success");
    }
    if (data.status === "cancelled") {
      $("#cart_header").html("Sorry, your order has been cancelled.");
      $("#submit_order")
        .html("Order Cancelled.")
        .addClass("btn btn-danger text-white");
    }
    if (data.status === "completed") {
      $("#cart_header").html("Your order is completed.");
      $("#submit_order")
        .html("Order Completed.")
        .addClass("btn btn-info text-white");
    }
  });
});

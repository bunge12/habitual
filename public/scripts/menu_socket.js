$(() => {
  $("div#body").append(`<audio id="orderAcceptSound">
  <source src="audio/alert1.mp3" type="audio/mpeg">
  </audio>
  `);
  $("div#body").append(`<audio id="orderReadySound">
  <source src="audio/alert3.mp3" type="audio/mpeg">
  </audio>
  `);
  $("div#body").append(`<audio id="orderCancelSound">
  <source src="audio/alert4.mp3" type="audio/mpeg">
  </audio>
  `);
  let intervalId;
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
          $("div#body audio#orderReadySound")[0].play();
          $("#cart_header").html("Your order is ready to pick up!");
        }
      };

      const completeTime = Date.now() + data.waitTime * 60 * 1000;

      intervalId = setInterval(function() {
        makeTimer(completeTime);
      }, 1000);

      $("div#body audio#orderAcceptSound")[0].play();

      $("#submit_order")
        .html("Order Accepted!")
        .removeClass("btn btn-warning")
        .addClass("btn btn-success");
      $toast = `<div class="toast accepted-toast" data-delay="7000" style="position: fixed;
        bottom: 9rem;
        right: 1rem;
        z-index: 9999;
        width: 40%;">
        <div class="toast-header">
          <strong class="mr-auto text-success">Order accepted</strong>
          <small class="text-muted">Just now!</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
        </div>
        <div class="toast-body">
          Your order has been accepted! The wait time for your items is approximately ${data.waitTime} minutes, so plan your journey accordingly. Check the timer below to stay on track.
        </div>
      </div>`;
      $(body).prepend($toast);
      $(".toast.accepted-toast").toast("show");
    }
    if (data.status === "cancelled") {
      $("div#body audio#orderCancelSound")[0].play();

      $("#cart_header").html("Sorry, your order has been cancelled.");
      $("#submit_order")
        .html("Order Cancelled.")
        .addClass("btn btn-danger text-white");
      $toast = `<div class="toast cancelled-toast" data-delay="7000" style="position: fixed;
        bottom: 9rem;
        right: 1rem;
        z-index: 9999;
        width: 40%;">
        <div class="toast-header">
          <strong class="mr-auto text-danger">Order cancelled</strong>
          <small class="text-muted">Just now!</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
        </div>
        <div class="toast-body">
          Your order has been cancelled by the restaurant. Please try again in a few minutes as they may be dealing with a higher than usual demand.
        </div>
      </div>`;
      $(body).prepend($toast);
      $(".toast.cancelled-toast").toast("show");
    }

    if (data.status === "completed") {
      clearInterval(intervalId);
      $("#cart_header").html("Your order is completed, Enjoy!");
      $("#submit_order")
        .html("Order Completed.")
        .addClass("btn btn-info text-white");
      $toast = `<div class="toast completed-toast" data-delay="7000" style="position: fixed;
        bottom: 9rem;
        right: 1rem;
        z-index: 9999;
        width: 40%;">
        <div class="toast-header">
          <strong class="mr-auto text-primary">Order completed</strong>
          <small class="text-muted">Just now!</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
        </div>
        <div class="toast-body">
          Thank you for your order! We hope to see you again soon!
        </div>
      </div>`;
      $(body).prepend($toast);
      $(".toast.completed-toast").toast("show");
    }
  });
});

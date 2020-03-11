$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function (data) {
    if (data.status === "accepted") {
      const makeTimer = function (completeTime) {
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

        $("#cart_header").html(`Ready in ${str}`);

        if (timeLeft < 0) {
          clearInterval(intervalId);
          $("#cart_header").html("Checkout your order!");
          $("#cart_header").append(`<audio id="orderReadySound">
          <source src="audio/alert1.mp3" type="audio/mpeg">
          </audio>
          `);
          $("audio#orderReadySound")[0].play();
        }
      };

      const completeTime = Date.now() + data.waitTime * 60 * 1000;

      const intervalId = setInterval(function () {
        makeTimer(completeTime);
      }, 1000);

      $("#submit_order")
        .html("Order Accepted!")
        .removeClass("btn btn-warning")
        .addClass("btn btn-success");
      $toast = `<div class="toast" data-delay="7000" style="position: fixed;
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
      $('.toast').toast('show');
    }
    if (data.status === "cancelled") {
      $("#cart_header").html("Your order has been cancelled.");
      $("#submit_order")
        .html("Order Cancelled.")
        .addClass("btn btn-danger text-white");
      $toast = `<div class="toast" data-delay="7000" style="position: fixed;
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
      $('.toast').toast('show');
    }
    if (data.status === "completed") {
      $("#cart_header").html("Your order is ready!");
      $("#submit_order")
        .html("Order Completed.")
        .addClass("btn btn-info text-white");
      $toast = `<div class="toast" data-delay="7000" style="position: fixed;
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
      $('.toast').toast('show');
    }
  });
});

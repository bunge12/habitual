$(() => {
  $("div#body").append(`<audio id="orderComingSound">
                        <source src="audio/alert2.mp3" type="audio/mpeg">
                        </audio>`);
  $(document).on("click", function() {
    document.title = "Habitual App";
  });

  let socket = io();
  socket.on("orderStatusChanged", function(data) {
    if (data.status === "pending") {
      $.ajax("/orders/last", { method: "GET" }).then(function(data) {
        let $order = `
        <div class="card order mb-2" id="div${data.orderid}">
        <div class="card-header">
          <span class="align-middle mr-1">Order #${data.orderid}
          </span>
          <span class="badge badge-pill badge-secondary">Pending</span>
          <span class="float-right">$${data.total_price / 100}</span>
        </div>
        <div class="card-body">
          <ul>`;
        for (let item of data.items) {
          $order += `<li>${item.qty} x ${item.name}</li>`;
        }
        $order += `</ul>
        </div>
        <div class="card-footer pending">
              <span class="float-right">
                <div class="input-group pending-buttons">
                  <form action="/orders/${data.orderid}" method="POST" class="cancel">
                    <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" name="status" value="cancelled">
                    <input type="hidden" name="waitTime" value="null">
                    <button id="c${data.orderid}"
                      class="btn-sm btn-outline-danger float-right mr-2 cancel_button" type="submit">
                      Cancel
                    </button>
                  </form>
                  <button class="btn btn-sm btn-outline-success" type="button" data-toggle="collapse"
                    data-target="#collapseExample${data.orderid}" aria-expanded="false"
                    aria-controls="collapseExample">
                    Accept
                  </button>
                </div>
              </span>
            </div>
            <div class="collapse" id="collapseExample${data.orderid}">
              <form action="/orders/${data.orderid}" method="POST" class="accept">
                <input type="hidden" name="_method" value="PUT">
                <input type="hidden" name="status" value="accepted">
                <div class="card card-body">
                  <div class="form-row">
                    <div class="col-4 text-right align-bottom mt-1">
                      Enter wait time
                    </div>
                    <div class="col-4">
                      <input type="text" class="form-control form-control-sm" placeholder="(minutes)" name="waitTime"
                        maxlength="2" size="2" required />
                    </div>
                    <div class="col-4">
                      <button id="a${data.orderid}" class="btn btn-sm btn-success" type="submit">Accept
                        Order</button>
                    </div>
                  </div>
                </div>
            </div>
            </form>
          </div>
          `;

        $(".pen_ord").prepend($order);
        $("div#body audio#orderComingSound")[0].play();

        document.title = "New pending order coming, checkout the orders.";
      });
    }
  });
});

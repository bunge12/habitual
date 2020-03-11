$(() => {
  let socket = io();
  socket.on("orderStatusChanged", function (data) {
    if (data.status === "pending") {
      $.ajax('/orders/last', { method: 'GET' })
        .then(function (data) {
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
          <div class="card-footer">
            <div class="input-group col-5 float-right pr-0 pending-buttons" style="max-width: 13rem;">
              <form action="/orders/${data.orderid}" method="POST" class="cancel">
                <input type="hidden" name="_method" value="PUT">
                <input type="hidden" name="status" value="cancelled">
                <input type="hidden" name="waitTime" value="null">
                <button id="c${data.orderid}"
                  class="btn-sm btn-outline-danger float-right mr-2 cancel_button" type="submit">
                  Cancel
                </button>
              </form>

              <div class="input-group-append">
                    <form action="/orders/${data.orderid}" method="POST" class="accept">
                      <input type="hidden" name="_method" value="PUT">
                      <input type="hidden" name="status" value="accepted">
                      <input type="text" class="form-control border border-info border-right-0 rounded-left"
                        placeholder="25m" name="waitTime" aria-label="Wait time" maxlength="4" size="4" required />
                      <button id="a${data.orderid}"
                        class="btn-sm btn-outline-info  border border-info border-left-0 rounded-right" type="submit">
                        Accept
                      </button>
                    </form>
                  </div>

            </div>
          </div>
        </div>`;
          // let newHTML = concat($order, $order2);
          $(".pen_ord").prepend($order);
        });
    }
  });
});

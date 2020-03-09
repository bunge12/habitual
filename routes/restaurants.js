/*
 * All routes for restaurants are defined here
 * Since this file is loaded in server.js into habitual/restaurants,
 *   these routes are mounted onto /reataurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

module.exports = (db, io) => {
  // show all the orders
  //! need the getAllOrders(limit) function from db
  //! should return all orders
  router.get("/", (req, res) => {
    req.session["user_id"] = 2;
    req.session["user_type"] = "restaurant";
    db.getCompletedOrders(20)
      .then(response => res.render("orders", response))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // place the order
  //! need the changeOrderStatus(orderId, status[,waitTime]) from db, should receive 2 or 3 params
  router.put("/:orderid", (req, res) => {
    const orderId = req.params.orderid;
    const { status, waitTime } = req.body;

    // emit io event
    // add following code to the html
    {
      /* <script src="/socket.io/socket.io.js"></script>
              <script>
          let socket = io();
          socket.on('orderStatusChanged', function (data) {
            console.log(data); // some jQuery
          });
        </script> */
    }
    // end

    io.emit("orderStatusChanged", { status, waitTime });

    db.changeOrderStatus(orderId, status, waitTime)
      .then(() => {
        if (status === "accepted") {
          // message says wait time
          twilioClient.messages.create({
            to: process.env.CUSTOMER_PHONE_NUM,
            from: process.env.TWILIO_PHONE_NUM,
            body: `Hello Alice, your order ID:${orderId} will be ready in ${waitTime} minutes!`
          });
        }
        if (status === "cancelled") {
          // message says cancelled
          twilioClient.messages.create({
            to: process.env.CUSTOMER_PHONE_NUM,
            from: process.env.TWILIO_PHONE_NUM,
            body: `Hello Alice, your order ID:${orderId} has been cancelled by the restaurant, sorry for the inconvenience.`
          });
        }
        if (status === "accepted") {
          // message says wait time
          twilioClient.messages.create({
            to: process.env.CUSTOMER_PHONE_NUM,
            from: process.env.TWILIO_PHONE_NUM,
            body: `Hello Alice, your order ID:${orderId} will be ready in ${waitTime} minutes!`
          });
        }
        if (status === "completed") {
          // message says wait time
          twilioClient.messages.create({
            to: process.env.CUSTOMER_PHONE_NUM,
            from: process.env.TWILIO_PHONE_NUM,
            body: `Hello Alice, your order ID:${orderId} is ready!`
          });
        }
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

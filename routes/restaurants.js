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

module.exports = db => {
  // show all the orders
  //! need the getAllOrders(limit) function from db
  //! should return all orders
  router.get("/", (req, res) => {
    req.session["user_id"] = req.params.id;
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
  //! should return an object {user_name, user_phone}
  router.put("/:id/orders/:orderid", (req, res) => {
    const orderId = req.params.orderid;
    const { status, waitTime } = req.body;
    db.changeOrderStatus(orderId, status, waitTime)
      .then(response => {
        const { name, phone } = response;
        if (status === "accepted") {
          // message says wait time
          twilioClient.messages.create({
            to: phone,
            from: process.env.TWILIO_PHONE_NUM,
            body: `Hello ${name}, your order ID:${orderId} will be ready in ${waitTime} minutes!`
          });
        }
        if (status === "canceled") {
          // message says canceled
          twilioClient.messages.create({
            to: phone,
            from: process.env.TWILIO_PHONE_NUM,
            body: `Hello ${name}, your order ID:${orderId} has been canceled by the restaurant, sorry for the inconvenience.`
          });
        }
        return res.send(response);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

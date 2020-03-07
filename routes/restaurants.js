/*
 * All routes for restaurants are defined here
 * Since this file is loaded in server.js into habitual/restaurants,
 *   these routes are mounted onto /reataurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // show all the orders
  //! need the getAllOrders(limit) function from db
  //! should return all orders
  router.get("/:id/orders", (req, res) => {
    req.session["user_id"] = req.params.id;
    req.session["user_type"] = "restaurant";
    db.getAllOrders(20)
      .then(response => res.send(response))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // place the order
  //! need the changeOrderStatus(orderId, status[,waitTime]) from db, should receive 2 or 3 params
  //! should return the status of new order to change the status
  //! not completed!!!!
  router.put("/:id/orders/:orderid", (req, res) => {
    const orderId = req.params.orderid;
    const { status, waitTime } = req.body;
    db.changeOrderStatus(orderId, status, waitTime)
      .then(response => res.send(response))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
    if (status === "accepted") {
      // message says wait time
    }
    if (status === "canceled") {
      // message says canceled
    }
  });

  return router;
};

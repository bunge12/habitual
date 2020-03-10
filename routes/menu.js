/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db, io) => {
  // show the menu with all items
  // setup the session cookies: user_id(id), user_type(customer)
  router.get("/", (req, res) => {
    req.session["user_id"] = 1;
    req.session["user_type"] = "customer";
    db.getAllItems(20)
      .then(response => res.render("menu", response))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // place the order
  router.post("/", (req, res) => {
    // user id
    const { item, order_value } = req.body;
    let queryArr = [];
    for (let i of item) {
      let strArr = i.split(",");
      let obj = { item_id: strArr[0], qty: strArr[1] };
      queryArr.push(obj);
    }
    // emit io event
    db.addNewOrder(order_value, queryArr)
      .then(() => {
        io.emit("orderStatusChanged", { status: "pending" });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};

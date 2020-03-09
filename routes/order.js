/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  // show the menu with all items
  // setup the session cookies: user_id(id), user_type(customer)
  //! need the getAllItems(limit) from db
  //! should return all the items
  router.get("/", (req, res) => {
    req.session["user_id"] = req.params.id;
    req.session["user_type"] = "customer";
    db.getAllItems(20)
      .then(response => res.render("menu", response))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // place the order
  //! need the addNewOrder(user_id) from db
  //! should return the status of new order to change the status of place-order-btn
  router.post("/:id/order", (req, res) => {
    // user id
    const id = req.session["user_id"] || req.params.id;
    db.addNewOrder(id)
      .then(response => res.send(response))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};

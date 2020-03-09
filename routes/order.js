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
  //! need the addNewOrder(user_id) from db
  //! should return the status of new order to change the status of place-order-btn
  router.post("/order", (req, res) => {
    // user id
    const user_id = req.session["user_id"];
    console.log("==========", "postpost");

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
    io.emit("orderStatusChanged", { status: "pending" });

    db.addNewOrder(user_id)
      .then(response => res.send(response))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};

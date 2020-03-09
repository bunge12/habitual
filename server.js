// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// PG database client/connection setup
const db = require("./db/database");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));

// method override for POST request from restaurant to change order status
// !add a hidden input tag to work, where name="_method"  value="METHOD-YOU-WANT"
// !<input type="hidden" name="_method" value="">
app.use(
  methodOverride(function(req) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"]
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const orderRoutes = require("./routes/order");
const restaurantsRoutes = require("./routes/restaurants");
const indexRoutes = require("./routes/index");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/order", orderRoutes(db, io));
app.use("/restaurants", restaurantsRoutes(db, io));
app.use("/", indexRoutes());
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.redirect("/");
// });

io.on("connection", function(socket) {
  console.log("=====\n", socket.id);
});

http.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} 😀`);
});

const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();
// exports.db = db;

// get all the menu items
const getAllItems = function(limit = 10) {
  const values = [limit];
  return db
    .query(
      `
  SELECT *
  FROM items
  WHERE active = true
  LIMIT $1
  `,
      values
    )
    .then(res => {
      const arr = res.rows;
      return { arr };
    });
};
exports.getAllItems = getAllItems;

const getAllOrders = function() {
  return db
    .query(
      `
  SELECT *
  FROM orders
  `
    )
    .then(res => {
      const arr = res.rows;
      return { arr };
    });
};
exports.getAllOrders = getAllOrders;


// place a new order
const addNewOrder = function(data) {
  const queryParams = [];
  const query1 = `
  INSERT INTO orders (user_id, status, total_price)
  VALUES (1, 'pending', data.total_price)
  `
  const query2 = `
  INSERT INTO order_items (item_id, qty, order_id)
  VALUES (data.item_id, data.qty, ${IDENT_CURRENT('orders')})
  `

  return db.query(query1, queryParams)
  .then(query2, queryParams)
  .then(res => res.rows);
}

const changeOrderStatus = function () {

}

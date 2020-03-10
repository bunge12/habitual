const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();
// exports.db = db;

// get all the menu items
const getAllItems = function (limit = 10) {
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

const getAllOrders = function () {
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
const addNewOrder = function (total_price, arr) {
  const query = `
  INSERT INTO orders (user_id, status, total_price)
  VALUES (1, 'pending', ${total_price})
  RETURNING id
  `
  return db.query(query)
    .then(res => {
      let queryString = ""
      for (const item of arr) {
        queryString += `
        INSERT INTO order_items (item_id, qty, order_id)
        VALUES (${item.item_id}, ${item.qty}, ${res.rows[0].id});
        `
      }
      db.query(queryString);
    })
}
exports.addNewOrder = addNewOrder;

// addNewOrder(2464, [{ item_id: 3, qty: 2 }, { item_id: 2, qty: 6 }]);

const changeOrderStatus = function (orderId, status, waitTime) {
  let query = '';
  if (waitTime) {
    query = `
    UPDATE orders SET status = ${status}, wait_time = ${waitTime}
    WHERE orders.id = ${orderId};`
  } else {
    query = `
    UPDATE orders SET status = ${status}
    WHERE orders.id = ${orderId};`
  }
  return db.query(query)
}
exports.changeOrderStatus = changeOrderStatus;

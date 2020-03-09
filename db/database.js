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
    .then(res => res.rows);
};
exports.getAllItems = getAllItems;

const getCompletedOrders = function() {
  return db
    .query(
      `
  SELECT *
  FROM orders
  WHERE status = 'completed'
  `
    )
    .then(res => {
      const arr = res.rows;
      return { arr };
    });
};
exports.getCompletedOrders = getCompletedOrders;

const getPendingOrders = function() {
  return db
    .query(
      `
  SELECT *
  FROM orders
  WHERE status = 'pending'
  `
    )
    .then(res => res.rows[0]);
};
exports.getPendingOrders = getPendingOrders;

const getAcceptedOrders = function() {
  return db
    .query(
      `
  SELECT *
  FROM orders
  WHERE status = 'accepted'
  `
    )
    .then(res => res.rows[0]);
};
exports.getAcceptedOrders = getAcceptedOrders;

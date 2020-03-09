const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();
exports.db = db;

// get all the menu items
const getAllItems = function() {
  return db.query(`
  SELECT *
  FROM items
  WHERE active = true
  `)
  .then(res => res.rows[0])
}
exports.getAllItems = getAllItems;


const getCompletedOrders = function() {
  return db.query(`
  SELECT *
  FROM orders
  WHERE status = 'completed'
  `)
  .then(res => res.rows[0])
}
exports.getCompletedOrders = getCompletedOrders;


const getPendingOrders = function() {
  return db.query(`
  SELECT *
  FROM orders
  WHERE status = 'pending'
  `)
  .then(res => res.rows[0])
}
exports.getPendingOrders = getPendingOrders;


const getAcceptedOrders = function() {
  return db.query(`
  SELECT *
  FROM orders
  WHERE status = 'accepted'
  `)
  .then(res => res.rows[0])
}
exports.getAcceptedOrders = getAcceptedOrders;

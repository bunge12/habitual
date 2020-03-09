const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString : connectionString
});

// get all the menu items
const getAllItems = function() {
  return pool.query(`
  SELECT *
  FROM items
  WHERE active = true
  `)
  .then(res => res.rows[0])
}
exports.getAllItems = getAllItems;


const getCompletedOrders = function() {
  return pool.query(`
  SELECT *
  FROM orders
  WHERE status = 'completed'
  `)
  .then(res => res.rows[0])
}
exports.getCompletedOrders = getCompletedOrders;


const getPendingOrders = function() {
  return pool.query(`
  SELECT *
  FROM orders
  WHERE status = 'pending'
  `)
  .then(res => res.rows[0])
}
exports.getPendingOrders = getPendingOrders;


const getAcceptedOrders = function() {
  return pool.query(`
  SELECT *
  FROM orders
  WHERE status = 'accepted'
  `)
  .then(res => res.rows[0])
}
exports.getAcceptedOrders = getAcceptedOrders;

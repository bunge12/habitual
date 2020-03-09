const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'lightbnb'
// });

// get all the menu items
const getMenuItems = function() {
  return pool.query(`
  SELECT *
  FROM items
  WHERE active = true
  `)
  .then(res => res.rows[0])
}
exports.getMenuItems = getMenuItems;


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

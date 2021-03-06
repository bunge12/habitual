# Habitual

Habitual is a full stack web application built with Node and Express that allows for customers to order items from the menu and for restaurants to manage orders. **BEWARE**: This app was published for learning purposes and it is not intended for use in production-grade software without a proper code review.

This project was created and published by me, [shuchitama](https://github.com/shuchitama) and [Joe123123](https://github.com/Joe123123) as part of our learnings at Lighthouse Labs.

## Final Product

- Two views: customer (menu) side and restaurant (order) side
- Customers can add and remove products from the cart, and modify quantities in the cart
- Restaurants can see all orders divided by their status (pending, accepted, completed, cancelled)
- Restaurants are notified by an audio & in-browser notification about new orders
- Customers are informed about their order status through visual, audio, and SMS notifications

## Stack

- Front End: Bootstrap, jQuery, AJAX
- Back End: Express, Node, Socket.io, Twilio
- Database: PostrgreSQL

## Screenshots

!["Adding items to the cart and placing an order"](https://github.com/bunge12/habitual/blob/master/docs/place_order.gif?raw=true)
!["Restaurant and customer both recieve notifications when an order status changes"](https://github.com/bunge12/habitual/blob/master/docs/notifications.gif?raw=true)

## Dependencies

- Node
- Body-parser
- EJS
- Express
- Method-override
- SASS
- PG
- Socket.io
- Twilio

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at http://localhost:8080/.
4. Go to http://localhost:8080/ in your browser.

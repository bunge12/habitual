const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

// send different sms providing the status
const sendMessage = function(orderId, status, waitTime) {
  let body;
  if (status === "accepted") {
    // message says wait time
    body = `Hello Alice, your order ID:${orderId} will be ready in ${waitTime} minutes!`;
  }
  if (status === "cancelled") {
    // message says cancelled
    body = `Hello Alice, your order ID:${orderId} has been cancelled by the restaurant, sorry for the inconvenience.`;
  }
  if (status === "completed") {
    // message says wait time
    body = `Hello Alice, your order ID:${orderId} is completed, Enjoy!`;
  }

  twilioClient.messages.create({
    to: process.env.CUSTOMER_PHONE_NUM,
    from: process.env.TWILIO_PHONE_NUM,
    body
  });
};

module.exports = sendMessage;

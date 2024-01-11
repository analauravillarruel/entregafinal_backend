// ticketService.js
const Ticket = require('../models/ticket');

async function createTicket(ticketData) {
  const ticket = new Ticket(ticketData);
  await ticket.save();
  return ticket;
}

module.exports = {
  createTicket,
};
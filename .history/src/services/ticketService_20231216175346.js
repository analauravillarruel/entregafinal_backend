// ticketService.js
const Ticket = require('../Dao/');

async function createTicket(ticketData) {
  const ticket = new Ticket(ticketData);
  await ticket.save();
  return ticket;
}

module.exports = {
  createTicket,
};
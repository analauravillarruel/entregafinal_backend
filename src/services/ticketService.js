// ticketService.js
const Ticket = require('../Dao/models/ticketModels');

async function createTicket(ticketData) {
  const ticket = new Ticket(ticketData);
  await ticket.save();
  return ticket;
}

module.exports = {
  createTicket,
};
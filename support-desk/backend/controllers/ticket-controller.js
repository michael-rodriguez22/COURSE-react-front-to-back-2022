const asyncHandler = require("express-async-handler")
const { User, Ticket } = require("../models")

// @method  GET
// @access  Private
// @route   /api/tickets
const getAllTickets = asyncHandler(async (req, res) => {
  res.send("all tickets")
})

// @method  POST
// @access  Private
// @route   /api/tickets
const createTicket = asyncHandler(async (req, res) => {
  res.send("create ticket")
})

module.exports = { getAllTickets, createTicket }

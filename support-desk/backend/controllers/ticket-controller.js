const asyncHandler = require("express-async-handler")
const { User, Ticket } = require("../models")

// @method  GET
// @access  Private
// @route   /api/tickets
const getAllTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const tickets = await Ticket.find({ user: req.user.id }).sort({
    createdAt: "desc",
  })

  res.json(tickets)
})

// @method  GET
// @access  Private
// @route   /api/tickets/:id
const getSingleTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not authorized")
  }

  res.json(ticket)
})

// @method  POST
// @access  Private
// @route   /api/tickets
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body
  if (!product || !description) {
    res.status(400)
    throw new Error("Product and description are required")
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
  })

  res.status(201).json(ticket)
})

// @method  PUT
// @access  Private
// @route   /api/tickets/"id"
const updateTicket = asyncHandler(async (req, res) => {
  const payload = {}
  const { product, description, status } = req.body

  if (product) payload.product = product
  if (description) payload.description = description
  if (status) payload.status = status

  if (!payload.product && !payload.description && !payload.status) {
    res.status(400)
    throw new Error("Nothing was updated")
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not authorized")
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  res.json(updatedTicket)
})

// @method  DELETE
// @access  Private
// @route   /api/tickets/:id
const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not authorized")
  }

  await ticket.remove()

  res.json({ message: "ticket successfully deleted" })
})

module.exports = {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
}

const asyncHandler = require("express-async-handler")
const { Note, User, Ticket } = require("../models")

// @method  GET
// @access  Private
// @route   /api/tickets/:ticketId/notes
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.json(notes)
})

// @method  POST
// @access  Private
// @route   /api/tickets/:ticketId/notes
const addNote = asyncHandler(async (req, res) => {
  const { text } = req.body
  if (!text) {
    res.status(400)
    throw new Error("Text must be included")
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const note = await Note.create({
    user: req.user.id,
    ticket: req.params.ticketId,
    isStaff: false,
    text,
  })

  res.json(note)
})

module.exports = { getNotes, addNote }

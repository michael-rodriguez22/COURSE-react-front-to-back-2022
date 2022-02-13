const router = require("express").Router()
const { protect } = require("../../middleware")

// tickets
const {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../../controllers/ticket-controller")

router.route("/").get(protect, getAllTickets).post(protect, createTicket)

router
  .route("/:id")
  .get(protect, getSingleTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket)

// notes
const { getNotes, addNote } = require("../../controllers/note-controller")

router.route("/:ticketId/notes").get(protect, getNotes).post(protect, addNote)

router.route("/:ticketId/notes/:noteId")
module.exports = router

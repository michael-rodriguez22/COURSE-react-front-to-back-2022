const mongoose = require("mongoose")

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },

    text: {
      type: String,
      required: [true, "Note can not be empty"],
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    // staffId - add if implementing admin portal and staff functionality
  },
  {
    timestamps: true,
  }
)

const Note = mongoose.model("Note", noteSchema)
module.exports = Note

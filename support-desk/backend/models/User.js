const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be included"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email address must be included"],
    },

    password: {
      type: String,
      required: [true, "Password must be included"],
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)

module.exports = User

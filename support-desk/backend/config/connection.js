const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    console.log(`Connecting to MongoDB database...`.yellow.dim)
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected! ${conn.connection.host}\n`.brightGreen.bold)
  } catch (err) {
    console.log(`MongoDB connection error: ${err.message}\n`.red.bold)
    process.exit(1)
  }
}

module.exports = connectDB

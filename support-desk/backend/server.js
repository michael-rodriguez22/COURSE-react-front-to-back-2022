require("dotenv").config()
const express = require("express")
const { PORT = 5000 } = process.env

const app = express()

app.use(require("./routes"))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

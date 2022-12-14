require("dotenv").config()
const express = require("express")
const cors = require("cors")
const database = require("./config/database")
const indexRoutes = require("./routes/indexRoutes")
const instituicoesRoutes = require("./routes/instituicoesRoutes")
const userRoutes = require("./routes/userRoutes")



const app = express()

app.use(express.json())
app.use(cors())
database.connect()

app.use(indexRoutes)
app.use("/instituicoes", instituicoesRoutes)
app.use("/users", userRoutes)

module.exports = app
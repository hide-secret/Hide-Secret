const express = require('express')
const app = express()
const path = require('path')

require("dotenv").config()
const { PORT } = process.env

//Parsing the request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(PORT, () => console.log(`Server running at port ${PORT}`))


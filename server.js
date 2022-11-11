const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();

const server = express()
server.use(express.json());

let cors = require("cors")
server.use(cors())

const mongoString = process.env.MONGODB_URI

mongoose.connect(mongoString)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("Connected successfully to database"));

const routes = require('./routes/routes');
server.use('/api', routes);

server.get('/', (req, res) => {
    res.send('Welcome to our quiz database!')
})

module.exports = { server, db }
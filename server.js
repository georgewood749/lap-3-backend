const express = require('express');
const { app, io, server } = require('./config/serverConfig');
const cors = require('cors');

const { init } = require('./config/socketConfig');

const bodyParser = require("body-parser")
app.use(bodyParser.json())

//* Server

app.use(cors());
app.use(express.json());

//* Routes
app.use('/users', require('./routes/users'));

//* Initialise socket connection
io.on("connection", socket => init(socket));

module.exports = { server };

const express = require('express');
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());


//* Routes
server.use('/users', require('./routes/users'));
server.use('/games', require('./routes/games'));

server.get('/', (req, res) => {
    res.send('Welcome to our AGTK API!')
})

module.exports = { server }

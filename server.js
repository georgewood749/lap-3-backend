const express = require('express');
const cors = require("cors");

const app = express();
const http = require("http");
const { Server } = require("socket.io")

app.use(cors());
app.use(express.json());

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id)


    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})


//* Routes
app.use('/users', require('./routes/users'));
app.use('/games', require('./routes/games'));

app.get('/', (req, res) => {
    res.send('Welcome to our AGTK API!')
})

module.exports = { server }

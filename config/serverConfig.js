const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { instrument } = require('@socket.io/admin-ui')

const io = require("socket.io")(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io'],
        methods: ["GET", "POST"],
        credentials: true,
    }
});

instrument(io, {
    auth: false
});

module.exports = { server, io, app };

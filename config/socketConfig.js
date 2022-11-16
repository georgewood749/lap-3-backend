const { io } = require('./serverConfig');
const User = require('../models/user');

function init(socket) {
    console.log(`User \"${socket.id}\" is mounted`);




    socket.on('join-room', (room, username, cb) => {
        socket.join(room)

        //* new player profile
        const player = new User({
            socketID: socket.id,
            username: username,
            scores: 0,
        });

        //* meet with other players in the room
        socket.to(room).emit('update-players', 
        room, 
        io.of("/").adapter.rooms.get(room).size, 
        Array.from(io.of("/").adapter.rooms.get(room))
        )
        
        cb({
            roomID: room, 
            roomSize: io.of("/").adapter.rooms.get(room).size,
            playersID: Array.from(io.of("/").adapter.rooms.get(room)),
        })
    })







    socket.on('disconnect', () => {
        console.log(`User \"${socket.id}\" is unmounted`)
    })
}

module.exports = { init };

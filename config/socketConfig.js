const { io } = require('./serverConfig');

function init(socket) {
    console.log(`User \"${socket.id}\" is mounted`);



    socket.on('join-room', (room, cb) => {
        socket.join(room)
        socket.emit('update-players', ( io.of("/").adapter.rooms.get(room).size ), msg => {console.log(msg);})
        
        cb({
            roomID: room, 
            // roomSize: io.of("/").adapter.rooms.get('2').size
        })
    })







    socket.on('disconnect', () => console.log(`User \"${socket.id}\" is unmounted`))
}

module.exports = { init };

const { io } = require('./serverConfig');

function init(socket) {
    console.log(`User \"${socket.id}\" is mounted`);












    socket.on('disconnect', () => console.log(`User \"${socket.id}\" is unmounted`))
}

module.exports = { init };

const { io } = require('./serverConfig');
const User = require('../models/user');
const Game = require('../models/game');

function init(socket) {
    console.log(`User \"${socket.id}\" is mounted`);

    socket.on('join-room', (room, username) => {
        socket.join(room)

        //* Total number of sockets in the 'room'
        const nPlayers = io.of("/").adapter.rooms.get(room).size;
        //* Full list of sockets in the 'room'
        const playersID = Array.from(io.of("/").adapter.rooms.get(room));
        
        console.log(`room ${room} has ${playersID}, ${nPlayers} in total`);
        io.to(room).emit('update-room', room, playersID)

    });

    socket.on('set-game', (category, numQuestions, difficulty, type, cb) => {
        fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`)
            .then(resp => resp.json())
            .then(data => new Game({
                settings: {
                    amount: numQuestions,
                    category: category,
                    difficulty: difficulty,
                    type: type,
                },
                contents: data.results
            })). then( game => { cb(game) })
    });

    socket.on('start-game', ( room, qa ) => {
        io.to(room).emit('teleport-players', qa)
    })

    socket.on('update-scores',(room, id, username, scores) => {
        io.to(room).emit('sync-scores', id, username, scores)
    })

    socket.on('submit-results', (username, scores) => {
        User.create(username, scores)
    })


    //* update room upon disconnecting
    socket.on('disconnecting', () => {
        Array.from(socket.rooms).forEach(
            room => {
                let playersID = Array.from(io.of("/").adapter.rooms.get(room)).filter(p => p !== socket.id)
                io.to(room).emit('update-room', room, playersID)
            }
        )
    })

    socket.on('disconnect', () => {
        console.log(`User \"${socket.id}\" is unmounted`)
    })
}

module.exports = { init };

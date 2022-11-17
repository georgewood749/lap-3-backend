const { io } = require('./serverConfig');
const User = require('../models/user');
const Game = require('../models/game');

function init(socket) {
    console.log(`User \"${socket.id}\" is mounted`);




    socket.on('join-room', (room, username) => {
        socket.join(room)
        // io.to(room).emit('add-players', room, username)

        const nPlayers = io.of("/").adapter.rooms.get(room).size;
        const playersID = Array.from(io.of("/").adapter.rooms.get(room));

        io.to(room).emit('update-room', room, playersID)


        //* new player profile
        // const player = new User({
        //     socketID: socket.id,
        //     username: username,
        //     scores: 0,
        // });

        // * meet with other players in the room
        // io.to(room).emit('update-players', 
        // room, 
        // io.of("/").adapter.rooms.get(room).size, 
        // Array.from(io.of("/").adapter.rooms.get(room))
        // )
        
        // cb({
        //     roomID: room, 
        //     roomSize: io.of("/").adapter.rooms.get(room).size,
        //     playersID: Array.from(io.of("/").adapter.rooms.get(room)),
        // })
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

    socket.on('start-game', (room, qa) => {
        console.log("got it", room);
        io.to(room).emit('teleport-players', qa)

    })


    //* update room upon disconnecting
    socket.on('disconnecting', () => {
        Array.from(socket.rooms).forEach(
            room => {
                let playersID = Array.from(io.of("/").adapter.rooms.get(room)).filter(p => p == socket.id)
                io.to(room).emit('update-room', room, playersID)
                console.log(room, playersID);
            }
        )
    })

    socket.on('disconnect', () => {
        console.log(`User \"${socket.id}\" is unmounted`)
        // io.to(room).emit('update-room', room, playersID)
    })
}

module.exports = { init };

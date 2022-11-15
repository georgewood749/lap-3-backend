require('dotenv').config();
const DB_URI = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME

const {server} = require('./server');
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

global.DB_URI = DB_URI;
global.dbName = dbName;

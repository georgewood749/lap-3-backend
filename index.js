require('dotenv').config();
const db_uri = process.env.DB_CONNECTION;
const db_name = process.env.DB_NAME;

const { server } = require('./server');

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`listening on http://localhost:${port}/`));

global.db_uri = db_uri
global.db_name = db_name

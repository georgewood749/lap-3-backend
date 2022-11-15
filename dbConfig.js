const { MongoClient } = require('mongodb')

const init = async () => {
    const client = await MongoClient.connect(DB_URI)
    return client.db(dbName)
}

module.exports = { init };

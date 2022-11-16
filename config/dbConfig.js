const { MongoClient } = require('mongodb')

const init = async () => {
    const client = await MongoClient.connect(db_uri)
    return client.db(db_name)
}

module.exports = { init };

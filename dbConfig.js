const { MongoClient } = require('mongodb')

const init = async () => {
    const client = await MongoClient.connect('mongodb+srv://admin:gBKAMaSoHndIzC1R@cluster0.0y9hxp2.mongodb.net/?retryWrites=true&w=majority')
    return client.db(dbName)
}

module.exports = { init };

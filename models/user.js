const { init } = require('../config/dbConfig')

class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.avatar_url = data.avatar_url
        this.scores = data.scores
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const usersData = await db.collection('users').find().toArray()
                const users = usersData.map(d => new User({ ...d, id: d._id }))
                resolve(users);
            } catch (err) {
                console.log(err);
                reject("Error retrieving users")
            }
        })
    }

    static create(username, avatar_url, scores){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const usersData = await db.collection('users').insertOne({ username, avatar_url, scores})
                const newUserData = await db.collection('users').find({_id:{$eq: usersData.insertedId}}).toArray()
                const newUser = new User(newUserData[0]);
                resolve (newUser);
            } catch (err) {
                reject('Error creating user');
            }
        });
    }

    static sortByScore(){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const usersData = await db.collection('users').find().sort({"scores":-1}).toArray()
                const sortedUsers = usersData.map(d => new User({ ...d, id: d._id }))
                resolve(sortedUsers);
            } catch (err) {
                console.log(err);
                reject("Error retrieving users (leaderboard)")
            }
        })
    }
}

module.exports = User;

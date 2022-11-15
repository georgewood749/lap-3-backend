const { init } = require ('../dbConfig');

class Game {
    constructor(data){
        this.id = data.id   // "_id"
        this.settings = data.settings
        this.contents = data.contents
        this.players = data.players
        /*
        this.settings = {
            category: data.settings.category,
            type: data.settings.type,
            difficulty: data.settings.difficulty,
        }
        this.contents = data.contents.map(c=>{return {
            question: c.question,
            correct_answer: c.correct_answer,
            incorrect_answers: c.incorrect_answers
        }})
        */

    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const gamesData = await db.collection('games').find().toArray()
                const games = gamesData.map(d => new Game({ ...d, id: d._id }))
                resolve(games);
            } catch (err) {
                console.log(err);
                reject("Error retrieving games")
            }
        })
    }
}

module.exports = Game;

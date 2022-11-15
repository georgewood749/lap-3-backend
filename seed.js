require('dotenv').config();

const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_CONNECTION)

const ranAvt = () => {
    const ranNum = Math.floor(Math.random() * 53);
    return `https://xsgames.co/randomusers/assets/avatars/pixel/${ranNum}.jpg`;
}


async function seed() {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    const LOC = await db.listCollections().toArray();

    if (LOC.length){
        await Promise.all(LOC.map(async(c) => await db.dropCollection(c.name)))
    }

    const users = db.collection('users');
    const games = db.collection('games');

    await users.insertMany([
        { username: "Aimy", avatar_url: ranAvt(), scores: 10},
        { username: "George", avatar_url: ranAvt(), scores: 300},
        { username: "Thamiem", avatar_url: ranAvt(), scores: 2},
    ]);
    
    
    await games.insertMany([
        { 
            settings: { category:"Geography", type: "multiple", difficulty: "easy" },
            contents: [
                { 
                    question: "What is the smallest country in the world?",
                    correct_answer: "Vatican City",
                    incorrect_answers: [ "Maldives", "Monaco", "Malta"] 
                },
                {
                    question: "Which small country is located between the borders of France and Spain?",
                    correct_answer: "Andorra",
                    incorrect_answers: [ "San Marino", "Vatican City", "Lichtenstein" ]
                }
            ],
            players: [
                { player_id: "00", scores: 10 },
                { player_id: "01", scores: 300 },
                { player_id: "02", scores: 2 }
            ]
        },
        { 
            settings: { category:"Science: Computers", type: "boolean", difficulty: "hard" },
            contents: [
                { 
                    question: "DHCP stands for Dynamic Host Configuration Port.",
                    correct_answer: "False",
                    incorrect_answers: [ "True" ] 
                },
                {
                    question: "The T-Mobile Sidekick smartphone is a re-branded version of the Danger Hiptop.",
                    correct_answer: "True",
                    incorrect_answers: [ "False" ]
                }
            ],
            players: [
                { player_id: "03", scores: 15022 },
                { player_id: "04", scores: 3200 },
                { player_id: "05", scores: 210999 }
            ]
        },
    ]);

    return "seeded."
}

seed()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());








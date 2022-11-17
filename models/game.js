class Game {
    constructor(data){
        this.settings = {
            amount: +data.settings.amount,
            category: data.settings.category,
            difficulty: data.settings.difficulty,
            type: data.settings.type,
            settingCoef: (data.settings.difficulty=='easy'? 1: (data.settings.difficulty=='medium'? 3 : (data.settings.difficulty=='hard'? 5 : 0))) * (data.settings.type == 'boolean'? 2 : (data.settings.type == 'multiple'? 4 : 0))
        }
        this.contents = data.contents.map(qa => { return {
            question: qa.question,
            correct_answer: qa.correct_answer,
            incorrect_answers: qa.incorrect_answers
        }})

    }
}
module.exports = Game;

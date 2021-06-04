module.exports = {
    commands: 'shuffle-guess',
    description: 'Sends a random, shuffled word for you to guess',
    maxArgs: 0,
    callback: (message, text) => {
        let randomWords = require('random-words');
        const word = randomWords()
        const { ShuffleGuess } = require('weky')
        const game = new ShuffleGuess({
        message: message,
        word: word,
        winMessage: `Great job <@${message.author.id}>, you won!`
})
game.start()
    }
}
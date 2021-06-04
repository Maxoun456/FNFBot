module.exports = {
    commands: 'fast-typer',
    description: 'Starts a round of fast-typer',
    maxArgs: 0,
    cooldown: 10,
    callback: (message, text) => {
        const txtgen = require('txtgen')
        const { FastType } = require('weky')
        var max = 69
        var min = 1
        const pingas = Math.floor(Math.random()*(max-min+1)+min)
        let propozitie
        console.log(pingas)
        if (pingas === 69) {
             propozitie = 'Snooping as usual i see'
        } else {
             propozitie = txtgen.sentence()
        }
        const game = new FastType({
            message: message,
            winMessage: `Great job <@${message.author.id}>, you won!`,
            sentence: propozitie,  
            loseMessage: `Nice try <@${message.author.id}>. Better luck next time!`, 
            time: 60000,
            startMessage: `Good luck <@${message.author.id}>!`
        })
        game.start()
    }
}
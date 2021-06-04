const economy = require('@features/economy')

module.exports = {
    commands: 'pay',
    description: 'Transfers the specified amount of points to a different user',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<Target User> <Number of points>',
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target){
             message.channel.send('Please specify a valid user')
             return
        }
        targetId = target.id
        if (targetId === message.author.id) {
            message.channel.send("You can't pay yourself!")
            return
        }
        const coinsToGive = arguments[1]
        if(isNaN(coinsToGive)){
            message.channel.send('Please specify a valid number of coins')
            return
        }
        const coinsOwned = await economy.getCoins(guild.id, member.id)
        if(coinsOwned < coinsToGive){
            message.channel.send("You don't have enough coins to perform this action")
            return
        }
        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            member.tag,
            coinsToGive * -1
        )
        const newBalance = await economy.addCoins(
            guild.id,
            targetId,
            target.tag,
            coinsToGive
        )

        message.channel.send(`You have given ${coinsToGive} points to <@${targetId}>! They now have ${newBalance} points and you have ${remainingCoins} points`)
    }
}
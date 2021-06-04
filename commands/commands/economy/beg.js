const economy = require('@features/economy')
module.exports = {
    commands: 'beg',
    description: 'Gives you a small, random amount of money. Varies from 5 to 100 coins. Usable every 30 seconds',
    maxArgs: 0,
    cooldown: 20,
    expectedArgs: "",
    callback: async (message, arguments) => {
        const target = message.author


        const guildId = message.guild.id
        const userId = target.id
        const userTag = target.tag
        var max = 100
        var min = 5
        const coins = Math.floor(Math.random()*(max-min+1)+min)
        const newCoins = await economy.addCoins(guildId, userId, userTag, coins)

        message.channel.send(`You received ${coins} points`)
    }
}
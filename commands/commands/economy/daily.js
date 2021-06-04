const economy = require('@features/economy')

module.exports = {
    commands: 'daily',
    description: 'Gives you the daily reward',
    maxArgs: 0,
    cooldown: 60 * 60 * 24,
    expectedArgs: "",
    callback: async (message, arguments) => {
        const target = message.author
        const guildId = message.guild.id
        const userId = target.id
        const userTag = target.tag
        const coins = 4000
        const newCoins = await economy.addCoins(guildId, userId, userTag, coins)
        message.channel.send(`You collected your daily reward of ${coins} points!`)
    }
}
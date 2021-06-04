const economy = require('@features/economy')

module.exports = {
    commands: ['balance','bal'],
    description: "Check your points balance, or someone else's",
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id
        const userTag = target.tag
        const points = await economy.getCoins(guildId, userId, userTag) 

        message.channel.send(`${target.tag} has ${points} points`)
    }
}
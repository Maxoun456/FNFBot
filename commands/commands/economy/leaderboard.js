const profileSchema = require('@schemas/profile-schema')
const mongo = require('@util/mongo')
module.exports = {
    commands: ['leaderboard','lb'],
    description: 'Sends a list of the top users balance',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<Economy/ Rank>',
    callback: async (message, args) => {
        const { guild } = message
        let text = `Here is the leaderboard for **${guild.name}**:\n\n`
        if(args[0].toLowerCase() == 'economy'){
        const results = await profileSchema.find({
            guildId: guild.id
        })
        .sort({
            coins: -1,
        }).limit(10)
        for (let counter = 0; counter < results.length; ++counter) {
            
            const { userTag, userId, coins = 0 } = results[counter]
            if(coins !== 0){
            text += `#${counter + 1} <@${userId}>  with ${coins} points\n`}
        }}
        if(args[0].toLowerCase() == 'rank') {
            const results = await profileSchema.find({
                guildId: guild.id
            })
            .sort({
                level: -1,
                xp: -1
            }).limit(10)
            for (let counter = 0; counter < results.length; ++counter) {
                
                const { userId, level = 0 } = results[counter]
                if(level !== 0){
                text += `#${counter + 1} <@${userId}>  with level ${level}\n`}
            }
        }
        message.channel.send(text, {"allowedMentions": { "users" : []}})
    }
}
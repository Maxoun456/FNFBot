const mongo = require('@util/mongo')
const canvacord = require('canvacord')
const profileSchema = require('@schemas/profile-schema')
const Discord = require('discord.js')
module.exports = {
    commands: 'rank',
    description: "Check your level rank, or someone else's",
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id
        const result = await profileSchema.findOne({
            userId: targetId,
            guildId: message.guild.id
        })
        const results = await profileSchema.find({
            guildId: message.guild.id
        })
        .sort({
            level: -1,
            xp: -1
        })
        var userRank = 0
        for(let counter = 0; counter < results.length; ++counter) {
            const { userId } = results[counter]
            if(userId === targetId){ userRank = counter + 1; break}
        }
        const neededXp = result.level * 100 + 100
        const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({format: "png", size: 1024}))
        .setProgressBar("#F81818", "COLOR")
        .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/831785987074949130/839764265652846612/Starlight20Black_SLAB_web.png")
        .setCurrentXP(result.xp)
        .setLevel(result.level)
        .setRank(userRank)
        .setRequiredXP(neededXp)
        .setUsername(target.username)
        .setDiscriminator(target.discriminator)
        const img = await rank.build()
        message.channel.send(new Discord.MessageAttachment(img, "RankCard.png"))
    }
}
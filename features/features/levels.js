const mongo = require('@util/mongo')
const profileSchema = require('@schemas/profile-schema')

module.exports = (client) => {
    const blacklistedChannels = ['760831596092981258', '760831724585746502','775714900285980692', '765948532346585150']
    client.on('message', message => {
        if(message.channel.type === 'dm') {
            return
        }
        const { guild, member } = message
        guildId = guild.id
        userId = member.id
        if(blacklistedChannels.includes(message.channel.id)) {
            return
        }
        if(message.author.bot || message.author.id === '694442205405773824'){
            return
        }
        var max = 10
        var min = 5
        const xpPoints = Math.floor(Math.random()*(max-min+1)+min)
        addXP(guildId, member.id, xpPoints, client, message)
    })
}
const getNeededXP = level => level * 100 + 100


const addXP = async (guildId, userId, xpToAdd, client, message) => {
    await mongo().then(async (mongoose) => {
        result = await profileSchema.findOneAndUpdate({
            guildId,
            userId
        }, {
            guildId,
            userId,
            $inc: {
                xp: xpToAdd
            }
        }, {
            upsert: true,
            new: true
        })
        let { xp, level } = result
        const needed = getNeededXP(level)

        if(xp >= needed) {
            ++level
            xp -= needed

            if(message.guild.id === '760828987114651658'){
                client.channels.cache.get('802673223409991711').send(`Congrats <@${userId}>, you have have leveled up! Your new level is ${level}. Points until level ${level + 1}: ${getNeededXP(level) - xp}`)
            } else {
                message.channel.send(`Congrats <@${userId}>, you have have leveled up! Your new level is ${level}. Points until level ${level + 1}: ${getNeededXP(level) - xp}`)
            }
            await profileSchema.updateOne({
                guildId,
                userId
            }, {
                level,
                xp
            })
        }
    })
}

module.exports.addXP = addXP
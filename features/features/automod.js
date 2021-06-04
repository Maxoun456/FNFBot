const mongo = require('@util/mongo')
const warnSchema = require('@schemas/warn-schema')

module.exports = client => {
    
    var swears = []
    client.on( 'message', async message => {
        const { channel } = message
        if(channel.type === 'dm') {
            return
        }
        if(message.guild.id === '760828987114651658') {
            swears = ['nigga', 'niggar', 'nigger', 'retard', 'faggot']
        }
        else {
            swears = ['ruby', 'rubies']
        }
    if (swears.some(word => message.content.toLowerCase().includes(word))) {
        const target = message.author

        const guildId = message.guild.id
        const userId = target.id
        const reason = 'Using banned word'

        const warning = {
            author: 'FNFBot#2852',
            timestamp: new Date().getTime(),
            reason
        }

        await mongo().then(async mongoose => {
            await warnSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $push: {
                    warnings: warning
                }
            }, {
                upsert: true
            })
        })
        message.delete()
        message.channel.send(`Automatically warned ${target.tag}!\nReason of warn: ${reason}`)
        target.send(`You have been warned in **${message.guild.name}**\n**Reason**: ${reason}`)
      }
    })
}
const pollSchema = require('@schemas/polls-schema')

module.exports = (client) => {
    client.on('message', async message => {
        if(message.channel.type === 'dm') {
            return
        }
        const { content, guild } = message
        const result = await pollSchema.findOne({
            guildId: guild.id
        })
        if(!result) {
            return
        }
        if(message.channel.id != result.channelId) {
            return
        }
        const eachLine = content.split('\n')
        for (line of eachLine) {
            if(line.includes('=')) {
                const split = line.split('=')
                const emoji = split[0].trim()
                message.react(emoji)
            }
        }
    })
}
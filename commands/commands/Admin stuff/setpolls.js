const pollSchema = require('@schemas/polls-schema')

module.exports = {
    commands: 'setpolls',
    maxArgs: 1,
    expectedArgs: '<Channel #>',
    callback: async (message, args) => {
        const targetChannel = message.mentions.channels.first() || message.channel
        const result = await pollSchema.findOneAndUpdate({
            guildId: message.guild.id
        }, {
            guildId: message.guild.id,
            channelId: targetChannel.id
        }, {
            upsert: true
        })
        message.channel.send(`Successfully set the polls channel to ${targetChannel}`)
    }
}
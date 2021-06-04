const suggestionSchema = require('@schemas/suggestions-schema')
const { fetchSuggestionChannels } = require('@features/suggestions')

module.exports = {
    commands: ['setsuggestions', 'setsuggestion'],
    permissionError: 'You need Administrator permissions to use this command',
    permissions: ['ADMINISTRATOR'],
    callback: async (message) => {
        const { channel, guild: { id: guildId} } = message
        const { id: channelId } = channel
        await suggestionSchema.findOneAndUpdate({
            _id: guildId
        }, {
            _id: guildId,
            channelId
        }, {
            upsert: true
        })
        message.channel.send(`The suggestions channel has been set to ${channel}`)

        fetchSuggestionChannels(guildId)
    }
}
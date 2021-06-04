const Discord = require('discord.js')
const suggestionSchema = require('@schemas/suggestions-schema')

const statusMessages = {
    WAITING: {
        text: '📊 This suggestion is still open for community feedback! Make sure you vote!',
        color: 0xffea00
    },
    ACCEPTED: {
        text: '✅ This idea has been approved!',
        color: 0x34eb5b
    },
    DENIED: {
        text: '❌ This idea has been denied. Better luck next time!',
        color: 0xc20808
    }
}

let suggestionCache = {}

const fetchSuggestionChannels = async (guildId) => {
    let query = {}

    if(guildId) {
        query._id = guildId
    }

    const results = await suggestionSchema.find(query)

    for(const result of results) {
        const { _id, channelId } = result
        suggestionCache[_id] = channelId
    }
}

module.exports = client => {
    fetchSuggestionChannels()

    client.on('message', message => {
        const { guild, channel, content, member } = message
        if(message.channel.type === 'dm') {
            return
        }
        if(!content) { return }
        const cachedChannelId = suggestionCache[guild.id]
        if(cachedChannelId && cachedChannelId === channel.id && !member.user.bot) {
            message.delete()

            const status = statusMessages.WAITING

            const embed = new Discord.MessageEmbed()
            .setColor(status.color)
            .setAuthor(member.displayName, member.user.displayAvatarURL())
            .addFields({
                name: 'Suggestion',
                value: content
            },
            {
                name: 'Status',
                value: status.text
            })
            .setFooter('Do you want to submit an idea? Just send a message with it down below!')

            channel.send(embed)
            .then(message => {
                message.react('👍')
                .then(() => {
                    message.react('👎')
                })
            })
        }
    })
}

module.exports.fetchSuggestionChannels = fetchSuggestionChannels

module.exports.statusMessages = statusMessages

module.exports.suggestionCache = () => {
    return suggestionCache
}
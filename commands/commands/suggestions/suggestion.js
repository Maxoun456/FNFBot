const { MessageEmbed } = require('discord.js')
const { statusMessages, suggestionCache } = require('@features/suggestions')

module.exports = {
    commands: 'suggestion',
    description: 'Approve / Deny a suggestion',
    permissionError: 'You need Administrator permissions to use this command',
    permissions: ['ADMINISTRATOR'],
    callback: async (message, args) => {
        const { guild } = message
        const messageId = args[0]
        const status = args[1].toUpperCase()
        args.shift()
        args.shift()
        const reason = args.join(' ')

        message.delete()
        const newStatus = statusMessages[status]
        if(status !== 'DENIED' && status !== 'ACCEPTED' && status !== 'WAITING'){
            message.channel.send(`Unknown status "${status}", please use ${Object.keys(statusMessages)}`).then(msg => msg.delete({timeout: 5000}))
            return
        }

        const channelId = suggestionCache()[guild.id]
        if(!channelId) {
            message.channel.send("An error occured. Please contact the developer of the bot (Powercube#4966)")
            return
        }

        const channel = guild.channels.cache.get(channelId)
        if(!channel) {
            message.channel.send('Could not find the suggestions channel')
            return
        }
        const targetMessage = await channel.messages.fetch(messageId, false, true)
        if(!targetMessage) {
            message.channel.send("The specified message doesn't exist")
            return
        }
        const oldEmbed = targetMessage.embeds[0]
        const embed = new MessageEmbed()
        .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
        .setColor(newStatus.color)
        .setFooter('Do you want to submit an idea? Just send a message with it down below!')
        if(oldEmbed.fields.length === 2){
            embed.addFields(oldEmbed.fields[0], {
                name: 'Status',
                value: `${newStatus.text}${reason ? ` Reason: ${reason}` : ''}`
            })
        }
        targetMessage.edit(embed)
    }
}
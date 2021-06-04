const Discord = require("discord.js");
const commandPrefixSchema = require('@schemas/command-prefix-schema')
const { prefix: globalPrefix } = require('@root/config.json')
const welcomeSchema = require('@schemas/welcome-schema')
const modLogsSchema = require('@schemas/mod-logs-schema')
const suggestionSchema = require('@schemas/suggestions-schema')
var { suggestionCache } = require('@features/suggestions')
module.exports = {
    commands: 'remove',
    description: 'placeholder',
    permissionError: 'You need Administrator permissions to use this command',
    permissions: ['ADMINISTRATOR'],
    callback: async (message, args) => {
        const embed = new Discord.MessageEmbed()
        var whatToRemove = args.join(' ').toLowerCase()
        var help = 0
        if(!whatToRemove.length) {
            help = 1
        }
        if(whatToRemove != 'welcome' && whatToRemove != 'mod-logs' && whatToRemove != 'suggestions') {
            help = 1
        }
        if(help == 1) {
            const result = await commandPrefixSchema.findOne({
                _id: message.guild.id
            })
            embed.setTitle('Features removing list')
            embed.addFields({
                name: `${result ? result.prefix : globalPrefix}remove welcome`,
                value: 'Removes the welcome message from your server if you set it up'
            },
            {
                name: `${result ? result.prefix : globalPrefix}remove mod-logs`,
                value: 'Removes the mod logs function from your server if you set it up'
            },
            {
                name: `${result ? result.prefix : globalPrefix}remove suggestions`,
                value: 'Removes the suggestions function from your server if you ever set it up'
            }
            )
            message.channel.send(embed)
            return
        }
        const { guild } = message
        if(whatToRemove == 'welcome') {
            await welcomeSchema.deleteOne({
                _id: guild.id
            })

            message.channel.send('Succesfully removed the welcome message!')
        }
        if(whatToRemove == 'mod-logs') {
            await modLogsSchema.deleteOne({
                _id: guild.id
            })
            message.channel.send('Successfully removed the mod logs function!')
        }
        if(whatToRemove == 'suggestions') {
            await suggestionSchema.deleteOne({
                _id: guild.id
            })
            delete suggestionCache()[guild.id]
            message.channel.send('Successfully removed the suggestions function!')
        }
    }
}
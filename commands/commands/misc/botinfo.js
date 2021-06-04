const Discord = require('discord.js')
const { version } = require('@root/package.json')
const mongo = require('@util/mongo')
const commandPrefixSchema = require('@schemas/command-prefix-schema')
const { prefix: globalPrefix } = require('@root/config.json')
const ms = require('ms')
module.exports = {
    commands: 'botinfo',
    description: 'Information about the bot',
    maxArgs: 0,
    callback: async (message) => {
        const { client } = message
        const result = await commandPrefixSchema.findOne({
            _id: message.guild.id
        })
        let totalMembers = 0
        let onlineTime = ''
        var remainTime = 0;
        var milliseconds = process.uptime().toFixed(0) * 1000
        while( milliseconds > 0) {
            remainTime = ms(milliseconds, { long: true})
            onlineTime += `${remainTime} `
            milliseconds = milliseconds - ms(remainTime)
        }
    for (const guild of client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size
    }
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Information about ${client.user.username}`,
        client.user.displayAvatarURL()
        )
        .addFields(
        {
            name: 'Bot Tag',
            value: `${client.user.tag}`
        },
        {
            name: 'Version',
            value: `FNFBot's current version is ${version}`
        },
        {
            name: 'Server prefix',
            value: `The prefix of this server is ${result ? result.prefix : globalPrefix}`
        },
        {
            name: 'Time since last restart',
            value: `${onlineTime}`,
        },
        {
            name: 'Server count',
            value: `FNFBot is a member in ${client.guilds.cache.size} servers`,
        },
        {
            name: 'Total members',
            value: `The servers FNFBot is a part of make up a total of ${totalMembers} members`,     
        }
        )
        message.channel.send(embed)
    }
}
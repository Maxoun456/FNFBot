const Discord = require('discord.js')
module.exports = {
    commands: 'serverinfo',
    description: 'Sends some info about the server',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        const { guild } = message

              const { name, region, memberCount, afkTimeout } = guild
              const icon = guild.iconURL()


              const embed = new Discord.MessageEmbed()
              .setTitle (`Server info for "${name}"`)
              .setThumbnail (icon)
            .addFields({
                name: 'Region',
                value: ` The region of this server is ${region}`,
                },
                {
                    name: 'Members',
                    value:`This server has ${memberCount} members`,
                },
                {
                    name: 'AFK Timeout',
                    value:`The AFK timeout for this server is ${afkTimeout /60} minutes`,
                },
                {
                    name: 'Server Owner',
                    value: `The owner of this server is ${message.guild.owner.user.tag}`
                }
            )
              message.channel.send(embed)
    },
}
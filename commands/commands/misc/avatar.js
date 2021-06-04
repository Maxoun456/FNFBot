const Discord = require('discord.js')
module.exports = {
    commands: ['avatar','av'],
    description: 'Gets the avatar of the target user',
    maxArgs: 1,
    expectedArgs : '[Target @]',
    callback: (message, arguments, text) => {
        const target = message.mentions.users.first() || message.author
        const image = target.displayAvatarURL()
        const embed = new Discord.MessageEmbed()
        .setTitle(`Here is the avatar of ${target.tag}`)
        .setImage(image)
        message.channel.send(embed)
    }
}
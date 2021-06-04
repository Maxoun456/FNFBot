const Discord = require('discord.js')
const economy = require('@features/economy')
const commandPrefixSchema = require('@schemas/command-prefix-schema')
const { prefix: globalPrefix } = require('@root/config.json')
module.exports = {
    commands: 'shop',
    description: 'Check what you can buy with your points',
    maxArgs: 0,
    callback: async (message, text) => {
        const { guild } = message
        const result = await commandPrefixSchema.findOne({
            _id: guild.id
        })
        embed = new Discord.MessageEmbed()
        .setTitle(`Welcome to the shop ${message.author.tag}!`)
        .setThumbnail('https://cdn.discordapp.com/attachments/831784738603401219/833733983199297646/Shop.png')
        .setColor('#ffff00')
        .setDescription('Use the buy command to buy an item!')
        .addFields({
            name: 'Millionaire role',
            value: `Gives you a special, purely cosmetic role\nCost: 1.000.000 points\nNo refunds.\nHow to buy: ${result ? result.prefix : globalPrefix}buy millionaire`
        })
        message.channel.send(embed)
    }
}
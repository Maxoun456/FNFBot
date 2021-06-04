const Discord = require('discord.js') 
const tournamentSchema = require('@schemas/tournament-schema')

module.exports = {
    commands: 'eliminateteam',
    minArgs: 1,
    expectedArgs: '<Team name>',
    permissionError: 'You need Administrator permissions to use this command',
    permissions: ['ADMINISTRATOR'],
    callback: async (message, args) => {
        const teamName = args.join(' ')
        const result = await tournamentSchema.findOne({
            teamName
        })
        if(!result) {
            message.channel.send('Please specify a valid team')
            return
        }
        await tournamentSchema.deleteOne({
            teamName
        })
        let text = ''
        for(let member of result.teamMembers) {
            const target = message.guild.members.cache.get(member)
            text += `${target.user.tag}\n`
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`A team has been eliminated!`)
        .addFields({
            name: 'Team name',
            value: `**${teamName}**`
        },
        {
            name: 'Team members',
            value: text
        })
        const channelID = '845127475226607637'
        const channel = message.guild.channels.cache.get(channelID)
        channel.send(embed)
    }
}
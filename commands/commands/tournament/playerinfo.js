const { MessageEmbed } = require('discord.js')
const tournamentSchema = require('@schemas/tournament-schema')

module.exports = {
    commands: 'playerinfo',
    callback: async (message, args) => {
        const target = message.mentions.users.first() || message.author
        const result = await tournamentSchema.findOne({
            teamMembers: {
                $all: [target.id]
            }
        })
        var members = ''
        if(result){
        for(const member of result.teamMembers)
        {
            const target2 = message.guild.members.cache.get(member)
            members += `${target2.user.tag}\n`
        }}
        const embed = new MessageEmbed()
        .setTitle(`Player Tournament info for ${target.tag}`)
        .setThumbnail(target.displayAvatarURL())
        if(result){
        embed.addFields({
            name: 'Team name',
            value: result.teamName
        },{
            name: 'Team members',
            value: members
        })}
        else {
            embed.addField('Team name', 'This member is not part of any team')
        }
        message.channel.send(embed)
    }
}
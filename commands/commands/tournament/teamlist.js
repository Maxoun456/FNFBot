const { MessageEmbed } = require('discord.js')
const tournamentSchema = require('@schemas/tournament-schema')

module.exports = {
    commands: 'teamlist',
    callback: async (message, args) => {
        const results = await tournamentSchema.find({})
        const embed = new MessageEmbed()
        .setTitle('Tournament teams')
        for(let counter = 0; counter < results.length; ++counter) {
            const { teamName, teamMembers } = results[counter]
            var members = ''
            for(const member of teamMembers)
            {
                const target = message.guild.members.cache.get(member)
                members += `${target.displayName}\n`
            }
            const count = teamMembers.length
            let uh = ''
            if(parseInt(count) === 1) {
                uh += 'member'
            }
            else { uh += 'members'}
            embed.addField(`Team #${counter+1} (${teamMembers.length} ${uh}): ${teamName}`, `Members:\n${members}`)
        }
        message.channel.send(embed)
        return
    }
}
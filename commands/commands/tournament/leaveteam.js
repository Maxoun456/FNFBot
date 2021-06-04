const tournamentSchema = require('@schemas/tournament-schema')

module.exports = {
    commands: 'leaveteam',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, args) => {
        const { guild } = message
        const result = await tournamentSchema.findOneAndUpdate({
            teamMembers: {
                $all: [message.author.id]
            }
        }, {
            $pull: {
                teamMembers: message.author.id
            }
        })
        if(result) {
            message.channel.send(`Successfully left the team **${result.teamName}**`)
            const roleName = `Team ${result.teamName}`
            const role = message.guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if(!role) {
            message.channel.send('Could not find a role corresponding to the specified team')
            return
        }
        message.member.roles.remove(role)
            if(result.teamMembers.length === 1) {
                await tournamentSchema.deleteOne({
                    teamName: result.teamName
                })
                role.delete('No members in the team were left')
                const str = result.teamName.toLowerCase()
                const realChannelName = str.replace(/ /g, "-")
                const channel = guild.channels.cache.find(i => i.name === `${realChannelName}`);
                await channel.delete();
            }
        }
        else {
            message.channel.send('Could not find the user in a team')
        }
    }
}
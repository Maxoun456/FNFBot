const tournamentSchema = require('@schemas/tournament-schema')

module.exports = {
    commands: 'jointeam',
    minArgs: 1,
    expectedArgs: '<Team Name>',
    callback: async (message, args) => {
        const teamName = args.join(' ')
        const result = await tournamentSchema.findOne({
            teamName
        })
        if(!result) {
            message.channel.send("The specified team doesn't exist")
            return
        }
        if(result.teamMembers.length == 3) {
            message.channel.send("The specified team is full!")
            return
        }
        const result2 = await tournamentSchema.findOne({
            teamMembers: {
                $all: [message.author.id]
            }
        })
        if(result2) {
            message.channel.send(`You are already in a team!\nYour team: **${result2.teamName}**`)
            return
        }
        await tournamentSchema.updateOne({
            teamName
        }, {
            $push: {
                teamMembers: message.author.id
            }
        })
        message.channel.send(`Successfully joined the team **${teamName}**`)
        const roleName = `Team ${teamName}`
        const role = message.guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if(!role) {
            message.channel.send('Could not find a role corresponding to the specified team')
            return
        }
        message.member.roles.add(role)
    }
}
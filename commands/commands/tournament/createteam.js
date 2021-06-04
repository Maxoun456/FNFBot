const { Permissions } = require('discord.js')
const tournamentSchema = require('@schemas/tournament-schema')

module.exports = {
    commands: 'createteam',
    minArgs: 1,
    expectedArgs: '<Team Name>',
    callback: async (message, args) => {
        const teamName = args.join(' ')
        const result2 = await tournamentSchema.findOne({
            teamMembers: {
                $all: [message.author.id]
            }
        })
        if(result2) {
            message.channel.send(`You are already in a team!\nYour team: **${result2.teamName}**`)
            return
        }
        var powerof2 = 1
        const serverMembers = (message.guild.memberCount - 1) / 3
        while(serverMembers > powerof2) {
            powerof2 = powerof2 * 2
        }
        if(serverMembers !== powerof2){ powerof2 = powerof2 / 2}
        const results = await tournamentSchema.find({})
        if(results.length === powerof2 || results.length > powerof2) {
            message.channel.send(`The team limit has been reached!\nNew spaces will be made when enough people join.\nMembers needed until more team slots are opened: **${(powerof2 * 6) - (message.guild.memberCount - 1)}**\nCurrent maximum team slots: **${powerof2}**\nTotal team slots when the member goal is achieved: **${powerof2 * 2}**`)
            return
        }
            await new tournamentSchema({
                guildId: message.guild.id,
                teamName,
                teamMembers: [message.author.id]
            }).save()
            message.channel.send(`Successfully created the team **${teamName}**!\nTeam members: <@${message.author.id}>`)

            
            message.guild.roles.create({
                data: {
                    name: `Team ${teamName}`
                }
            }).then(r => {
                const rID = r.id
                message.member.roles.add(r)
                message.guild.channels.create(`${teamName}`, {
                    parent: '848344688820748330',
                    permissionOverwrites: [ { id: message.guild.id, deny: [ Permissions.FLAGS.VIEW_CHANNEL ] }, { id: r.id, allow: [ Permissions.FLAGS.VIEW_CHANNEL ] } ] })
                    const channelId = '849871771384545290'
                    const channel = message.guild.channels.cache.get(channelId)      
                    channel.updateOverwrite(r, {
                        VIEW_CHANNEL: true
                    })
            })
    }
}
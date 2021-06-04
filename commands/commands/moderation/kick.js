module.exports = {
    commands: 'kick',
    description:'Kicks the targeted member. Only usable by Administrators',
    expectedArgs: '<User to kick> [Reason]',
    permissionError: 'You need Administrator permissions to use this command',
    permissions: ['ADMINISTRATOR'],
    callback: async (message, arguments, text) => {
        const { member , mentions } = message

        const tag = `<@${member.id}>`
        
            const target  = message.mentions.users.first()

            arguments.shift()
            const reason = arguments.join(' ')
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                
                if (!targetMember.kickable){ message.channel.send(`${tag} This member has higher permissions than me, kick failed`); return}
                else{
                    if(reason) {
                        await target.send(`You have been kicked from **${message.guild.name}**\n Reason: **${reason}**`).then(targetMember.kick())
                    }
                    if(!reason) {
                        await target.send(`You have been kicked from **${message.guild.name}**\nNo reason specified`).then(targetMember.kick())
                    }
                
                message.channel.send(`Succesfully kicked ${target.tag}!`)
            }
                
            }
         else { message.channel.send('User not found')}
        
    },
}
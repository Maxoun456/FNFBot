module.exports = {
    commands: 'ban',
    description: 'Bans the targeted member. Only usable by Administrators',
    expectedArgs: '<User to ban>',
    permissionError: 'You need Administrator permissions to use this command',
    minArgs: 0,
    permissions: ['ADMINISTRATOR'],
    callback: async (message, arguments, text) => {
        const { member , mentions } = message
        const tag = `<@${member.id}>`
        
            const target  = message.mentions.users.first()

            arguments.shift()
            const reason = arguments.join(' ')

            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                if (!targetMember.bannable) message.channel.send(`${tag} This member has higher permissions than me, ban failed`);
                else{
                    if(reason) {
                        await target.send(`You have been banned from **${message.guild.name}**\n Reason: **${reason}**`).then(targetMember.ban())
                    }
                    if(!reason) {
                        await target.send(`You have been banned from **${message.guild.name}**\nNo reason specified`).then(targetMember.ban())
                    }
                message.channel.send(`Succesfully banned ${target.tag}!`)}
            }
         else { message.channel.send('User not found')}
    },
}
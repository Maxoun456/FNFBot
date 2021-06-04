module.exports = {
    commands: 'removerole',
    description: 'Takes away the specified role from the target user',
    minArgs: 2,
    expectedArgs: "<Target User> <Role name>",
    permisssionError: "You need Administrator permissions to use this command",
    permissions: 'ADMINISTRATOR',
    callback: (message, arguments) => {
        const target = message.mentions.users.first()
        if(!target) {
            message.channel.send('Please specify a valid user')
            return
        }

        arguments.shift()

        const roleName = arguments.join(' ')
        const { guild } = message

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if(!role) {
            message.channel.send('Please specify a valid role')
            return
        }

        const member = guild.members.cache.get(target.id)
        if(member.roles.cache.get(role.id)) {
            member.roles.remove(role)
            message.channel.send(`Succesfully took away the ${roleName} role from ${target.tag}`)
        } else {
            message.channel.send(`${target.tag} doesn't have the ${roleName} role`)
        }
    }
}
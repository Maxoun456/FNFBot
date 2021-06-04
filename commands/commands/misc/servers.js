module.exports = {
    commands: 'servers',
    description: 'Sends a list of all the servers the bot is in and their member counter',
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
        var text = ''
        message.client.guilds.cache.forEach(guild => {
            text += `${guild.name} has ${guild.memberCount} members\n`
            
        })
        message.channel.send(text)
    },
}
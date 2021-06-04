module.exports = {
    commands: ['cc','clearchannel'],
    description: 'Wipes a big chunk of messages in the channel the command is used in. Only usable by Administrators' ,
    permissionError: 'You need Administrator permissions to use this command',
    minArgs: 0,
    maxArgs: 0,
    permissions: ['ADMINISTRATOR'],
    callback: (message, arguments, text) => {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results)
        })
    },
}
module.exports = {
    commands: ['deletechannel','delchannel'],
    description: 'Deletes the channel the command was used in',
    maxArgs: 0,
    permissionError: 'You need Administrator permissions to use this command',
    permissions: 'ADMINISTRATOR',
    callback: (message, arguments, text) => {
        message.channel.delete()
    }
}
module.exports = {
    commands: ['createtextchannel','ctc'],
    description: 'Creates a text channel with the declared name',
    permissionError: 'You need Administrator permissions to use this command',
    minArgs: 1,
    expectedArgs: '<Channel name>',
    permissions: ['ADMINISTRATOR'],
    callback: (message, arguments, text) => {
        const name = arguments.join(' ');
            message.guild.channels
              .create(name, {
                type: 'text',
              })
    }
}
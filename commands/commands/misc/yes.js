module.exports = {
    commands: ['yes','ok'],
    description: 'Catto approves',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.delete()
        message.channel.send(`${message.member.displayName}: <a:yes:831813376090963988>`)
    },
}
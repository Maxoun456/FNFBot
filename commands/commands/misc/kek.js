module.exports = {
    commands: 'kek',
    description: 'Fucking hilarious',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.delete()
        message.channel.send(`${message.member.displayName}: <:kek:848644264236679209>`)
    },
}
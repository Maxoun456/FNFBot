module.exports = {
    commands: 'pog',
    description: 'Certified poggers moment',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.delete()
        message.channel.send(`${message.member.displayName}: <:pog:848644237770883092>`)
    },
}
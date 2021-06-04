module.exports = {
    commands: 'sadge',
    description: 'The Great depression',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.delete()
        message.channel.send(`${message.member.displayName}: <:sadge:848644114466471978>`)
    },
}
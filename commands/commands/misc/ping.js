module.exports = {
    commands: ['ping', 'test'],
    description: "Measures the bot's response time",
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.channel.send(`Pong! ${Date.now() - message.createdTimestamp}ms <:lemon_stump:831786836048740364>`)
    },
}
module.exports = {
    commands: 'say',
    description: 'Make FNFBot say what you want it to',
    minArgs: 0,
    callback: (message, args) => {
        const { author } = message
        const content = args.join(' ')
        message.delete()
        message.channel.send(`${content}`)
    }
}
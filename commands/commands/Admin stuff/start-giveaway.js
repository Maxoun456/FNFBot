module.exports = {
    commands: 'startgiveaway',
    permissionError: 'You need Administrator permissions to use this command',
    permissions: ['ADMINISTRATOR'],
    callback: async (message, args) => {
        message.delete().then(() => {
            const { guild, channel, client } = message

            channel.messages.fetch({ limit: 1 }).then( messages => {
                message = messages.first()

                if(!message) {
                    channel.send(`There is no other message! Please write a message with your giveaway and use this command again!`)
                    return
                }
                emote = args.join(' ')
                try {
                    message.react(emote)
                }
                catch (err) {
                    channel.send('Could not react using the specified emote')
                    console.err(err)
                    return
                }
            })
        })
    }
}
module.exports = {
    commands: ['doublesadge','ds'],
    description: 'Even more sadge',
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
        message.delete()
        message.channel.send(`${message.member.displayName}: <:doubleSadge:848644153181339676>`)
    },
}
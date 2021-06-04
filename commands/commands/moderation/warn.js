const mongo = require('@util/mongo')
const warnSchema = require('@schemas/warn-schema')

module.exports = {
    commands: 'warn',
    description: 'Warns the target user',
    minArgs: 2,
    expectedArgs: "<Target user> <Reason>",
    permissionError: "You need Administrator permissions to use this command",
    permissions: 'ADMINISTRATOR',
    callback: async (message, arguments) => {
        const target = message.mentions.users.first()
        if(!target) {
            message.channel.send('Please specify the user to warn')
            return
        } 

        arguments.shift()

        const guildId = message.guild.id
        const userId = target.id
        const reason = arguments.join(' ')

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason
        }

        await mongo().then(async mongoose => {
            await warnSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $push: {
                    warnings: warning
                }
            }, {
                upsert: true
            })
        })
        message.channel.send(`Succesfully warned ${target.tag}!\nReason of warn: ${reason}`)
        target.send(`You have been warned in **${message.guild.name}**\n**Reason**: ${reason}`)
    }
}
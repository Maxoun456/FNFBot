const mongo = require('@util/mongo')
const warnSchema = require('@schemas/warn-schema')

module.exports = {
    commands: ['warnings', 'warns'],
    description: 'Lists the warnings of a target',
    maxArgs: 1,
    expectedArgs: "<Target User>",
    callback: async (message, arguments, text) => {
        const target = message.mentions.users.first() || message.author
        if(!target) {
            message.channel.send('Please specify a valid user')
            return
        }

        const guildId = message.guild.id
        const userId = target.id

        await mongo().then(async mongoose => {
            const results = await warnSchema.findOne({
                guildId,
                userId
            })
            
            if(results == null) {
                message.channel.send(`${target.tag} has no active warnings`)
                return
            }
            let reply = `${target.tag} has the following warnings:\n\n`

            for(const warning of results.warnings) {
                const { author, timestamp, reason } = warning

                reply += `Warned by ${author} on ${new Date(timestamp).toLocaleDateString()} with the reason being "${reason}"\n`
            }

            message.channel.send(reply)
        })
    }
}
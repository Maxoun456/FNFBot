const mongo = require('@util/mongo')
const commandPrefixSchema = require('@schemas/command-prefix-schema')

const commandBase = require('@root/commands/command-base')

module.exports = {
  commands: 'setprefix',
  description: 'Sets the prefix to the specified one',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<new prefix>",
  permissionError: 'You must be an Administrator to run this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text) => {
    await mongo().then(async (mongoose) => {
        const guildId = message.guild.id
        const prefix = arguments[0]

        await commandPrefixSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            prefix,
          },
          {
            upsert: true,
          }
        )

        message.reply(`The prefix for this bot is now ${prefix}`)

        commandBase.updateCache(guildId, prefix) 
    })
  },
}

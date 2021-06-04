const modLogsSchema = require('@schemas/mod-logs-schema')

module.exports = {
    commands: 'setmodlogs',
    description: 'Sets the mod logs of your guild',
    expectedArgs: '<Mod logs channel> <Moderator role>',
    permissionError: 'You need Administrator permissions to use this command',
    permissions: ['ADMINISTRATOR'],
    minArgs: 2,
    callback: async (message, args) => {
        const { channel, guild } = message
        const targetChannel = message.mentions.channels.first() || channel
        args.shift()
        const Role = args.join(' ')
        if(!targetChannel) {
            message.channel.send('Please specify a valid channel')
            return
        }
        const roles = [Role]
        const existRole = guild.roles.cache.find((role) => {
            return roles.includes(role.name)
        })
        if(!existRole) {
            message.channel.send('Please specify a valid role')
            return
        }
         await modLogsSchema.findOneAndUpdate({
             _id: guild.id
         }, {
             _id: guild.id,
             channelId: targetChannel.id,
             roleName: Role
         }, {
             upsert: true
         })
         message.channel.send(`Successfully set the mod logs channel to <#${targetChannel.id}>! Now tracking the role ${Role}`)
    }
}
const Discord = require('discord.js')
const modLogsSchema = require('@schemas/mod-logs-schema')
const commandPrefixSchema = require('@schemas/command-prefix-schema')
const { prefix: globalPrefix } = require('@root/config.json')

module.exports = (client) => {
    
    client.on('message', async message => {
        const { guild, content, member } = message
        if(message.channel.type === 'dm') {
            return
        }
        if(member.user.bot){
            return
        }
        const serverChannel = await modLogsSchema.findOne({
            _id: guild.id
        })
        if(!serverChannel) { return }
        const modChannelId = serverChannel.channelId
        const roles = [serverChannel.roleName]
        const hasRole = member.roles.cache.find((role) => {
            return roles.includes(role.name)
        })
        
        if(hasRole) {
            const channel = guild.channels.cache.get(modChannelId)
            const result = await commandPrefixSchema.findOne({
                _id: guild.id
            })
            const serverprefix = result ? result.prefix : globalPrefix
            const args = message.content.slice(serverprefix.length).trim().split(/ +/);
            const command = args[0].toLowerCase()
            const embed = new Discord.MessageEmbed()
            if(command !== 'kick' && command !== 'ban' && command !== 'warn') {
                return
            }
                embed.setTitle(`The ${command} command was used!`)
                embed.addField('Moderator that used the command', message.author.tag)
                const targetUser = message.mentions.users.first()
                if(!targetUser) {
                    embed.addField('Targeted member', 'No valid member was specified')
                    channel.send(embed)
                }
            else {
                embed.addField('Targeted member', targetUser.tag)
                channel.send(embed)
                args.shift()
                args.shift()
                const reason = args.join(' ')
                if(reason.length) {
                    embed.addField('Reason', reason)
                }
                else {
                    embed.addField('Reason', "No reason specified")
                }
            }
            
        } 
    })
}
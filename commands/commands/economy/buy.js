const Discord = require('discord.js')
const economy = require('@features/economy')

module.exports = {
    commands: 'buy',
    description: 'Use this command to buy something from the shop',
    minArgs: 1,
    expectedArgs: "<Item to buy>",
    callback: async (message, arguments, text) => {
        const { guild } = message
        const member = message.member
        console.log(member)
        const item = arguments.join(' ')
        if(item === 'millionaire'){
            const roleName = 'FNF Millionaire'
            const role = guild.roles.cache.find((role) => {
                return role.name === roleName
            })
            if(!role){
                message.channel.send(`This server has no millionaire role. Creating one automatically...`)
                await guild.roles.create({
                     data: {
                      name: 'FNF Millionaire',
                      color: '#33cc33',
                    }
                })
                message.channel.send('And... Done! Please run the command again to receive your role')
                return
            }
            if(member.roles.cache.get(role.id)) {
                message.channel.send('You already have this role!')
                return
            }
            const coinsOwned = await economy.getCoins(guild.id, member.id, member.tag)
            if(coinsOwned < 1000000){
                message.channel.send("You don't have enough points to buy this item")
                return
            }
            member.roles.add(role)
            const remainingCoins = await economy.addCoins(
                guild.id,
                member.id,
                member.tag,
                -1000000
            )
            message.channel.send('Transaction successful! Enjoy your new role!')
        }
    }
}
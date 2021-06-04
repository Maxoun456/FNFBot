const economy = require('@features/economy')

module.exports = {
    commands: 'work',
    description: 'Gives you a bigger amount of money, only usable every 15 minutes',
    maxArgs: 0,
    cooldown: 60 * 15,
    expectedArgs: "",
    callback: async (message, arguments) => {
        const target = message.author


        const guildId = message.guild.id
        const userId = target.id
        const userTag = target.tag
        var max = 1500
        var min = 600
        var randomMesage = ["battled against boyfriend and got", "gave Pico a gun. He thanked you and gave you","asked the Mall Santa for some points. He gave you","did some chores for Daddy Dearest. He rewarded you with"]
        const coins = Math.floor(Math.random()*(max-min+1)+min)
        const newCoins = await economy.addCoins(guildId, userId, userTag, coins)
        const randomMesg = Math.floor(Math.random() * randomMesage.length);
        message.channel.send(`You ${randomMesage[randomMesg]} ${coins} points`)
    }
}
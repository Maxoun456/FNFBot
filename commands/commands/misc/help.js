const mongo = require('@util/mongo')
const commandPrefixSchema = require('@schemas/command-prefix-schema')
const { prefix: globalPrefix } = require('@root/config.json')
const Discord = require('discord.js')
module.exports = {
  commands: ['help', 'h'],
  description: "Describes all of this bot's commands",
  callback: async (message, arguments, text) => {
    const guildId = message.guild.id
    const result = await commandPrefixSchema.findOne({
        _id: guildId
    })
    if(arguments[0] === undefined) {
      const embed = new Discord.MessageEmbed()
      .setTitle("Commands list for FNFBot")
      .setThumbnail("https://cdn.discordapp.com/attachments/831784738603401219/835822847057461248/MaxPixel.png")
      .setFooter(`The prefix for this server is ${result ? result.prefix : globalPrefix}`)
      .setImage('https://cdn.discordapp.com/attachments/760831596092981258/841696280409014323/petpet.gif')
      .addFields({
        name: 'Administrator only commands',
        value: `${result ? result.prefix : globalPrefix}help administrator`
      },
      {
        name: 'Economy commands',
        value: `${result ? result.prefix : globalPrefix}help economy`
      },
      {
        name:'Level related commands',
        value: `${result ? result.prefix : globalPrefix}help levels`
      },
      {
        name:'Minigame commands',
        value:`${result ? result.prefix : globalPrefix}help minigames`
      },
      {
        name:'Moderation commands',
        value:`${result ? result.prefix : globalPrefix}help moderation`
      },
      {
        name: 'Suggestion commands',
        value:`${result ? result.prefix : globalPrefix}help suggestions`
      },
      {
        name:'Miscellaneous commands',
        value:`${result ? result.prefix : globalPrefix}help miscellaneous / ${result ? result.prefix : globalPrefix}help misc`
      }
      )
      message.channel.send(embed)
      return
    }
    const section = arguments.join(' ')
    if(section !== 'administrator' && section !== 'economy' && section!== 'levels' && section !== 'minigames' && section !== 'moderation' && section !== 'misc' && section !== 'miscellaneous' && section !== 'suggestions') {
      message.channel.send('Please specify a valid section')
      return
    }
    if(section === 'administrator') {
      const embed = new Discord.MessageEmbed()
      .setTitle("Administrator commands for FNFBot")
      .setThumbnail("https://cdn.discordapp.com/attachments/831784738603401219/835822847057461248/MaxPixel.png")
      .setFooter(`The prefix for this server is ${result ? result.prefix : globalPrefix}`)
      .setImage('https://cdn.discordapp.com/attachments/760831596092981258/841696280409014323/petpet.gif')
      .addFields({
        name: 'Clearchannel / CC',
        value: 'Deletes a bunch of messages in the channel the command was used in'
      },
      {
        name: 'Createtextchannel / CTC <Channel Name>',
        value: 'Creates a text channel with the given name'
      },
      {
        name: 'Createvoicechannel / CVC <Channel Name>',
        value: 'Creates a voice channel with the given name'
      },
      {
        name: 'Deletechannel / Delchannel',
        value: 'Deletes the channel **where the command was used in**'
      },
      {
        name: 'Setprefix',
        value: "Changes the bot's prefix to the specified one (can be glitchy with emotes / pings)"
      },
      {
        name: 'Setwelcome',
        value: "Sets a welcome message that is sent every time an user joins the server \n**To ping the user in your welcome message use <@>!**\nMessage example: Hello there <@>! Make sure you check out the rules!\n**Make sure you use this command in the channel where you want the messages to be!**"
      },
      {
        name: 'Simjoin',
        value: "Simulates someone joining to test your welcome message"
      },
      {
        name: 'Remove',
        value: `Allows you to remove enabled features\n Use ${result ? result.prefix : globalPrefix}remove without any arguments to see what you can disable`
      },
      {
        name: 'Setmodlogs',
        value: "Set a mod log channel to see what your moderator team is doing!"
      },
      {
        name: 'Giverole',
        value: "Gives the specified role to the target user"
      },
      {
        name: 'Removerole',
        value: "Removes the specified role from the target user"
      }
      )
      message.channel.send(embed)
      return
    }
    if(section === 'economy')
    {
      const embed = new Discord.MessageEmbed()
      .setTitle('Economy commands for FNFBot')
      .setThumbnail('https://cdn.discordapp.com/attachments/831784738603401219/835822847057461248/MaxPixel.png')
      .setFooter(`The prefix for this server is ${result ? result.prefix : globalPrefix}`)
      .setImage('https://cdn.discordapp.com/attachments/760831596092981258/841696280409014323/petpet.gif')
      .addFields({
        name: 'Balance / Bal',
        value: "Checks your balance or someone else's"
      },
      {
        name: 'Beg',
        value: 'Earns you a small amount of money. Usable every 30 seconds'
      },
      {
        name: 'Work',
        value: 'Earns you a bigger amount of money. Usable every 15 minutes'
      },
      {
        name: 'Daily',
        value: 'Gives you 4000 points. Usable once per day'
      },
      {
        name: 'Leaderboard',
        value: 'Sends a list of the richest players in the server'
      },
      {
        name: 'Pay',
        value: 'Transfers the specified money value to the target user'
      },
      {
        name: 'Shop',
        value: 'Sends an embed containing all of the items in the shop'
      },
      {
        name: 'Buy',
        value: 'Buys an item from the shop'
      }
      )
      message.channel.send(embed)
      return
    }
    if(section === 'levels') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Level commands for FNFBot')
      .setThumbnail('https://cdn.discordapp.com/attachments/831784738603401219/835822847057461248/MaxPixel.png')
      .setFooter(`The prefix for this server is ${result ? result.prefix : globalPrefix}`)
      .setImage('https://cdn.discordapp.com/attachments/760831596092981258/841696280409014323/petpet.gif')
      .addFields({
        name: 'Rank',
        value: 'Sends the level, xp and remaining xp until the next level of the target user'
      })
      message.channel.send(embed)
      return
    }
    if(section === 'minigames') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Economy commands for FNFBot')
      .setThumbnail('https://cdn.discordapp.com/attachments/831784738603401219/835822847057461248/MaxPixel.png')
      .setFooter(`The prefix for this server is ${result ? result.prefix : globalPrefix}`)
      .setImage('https://cdn.discordapp.com/attachments/760831596092981258/841696280409014323/petpet.gif')
      .addFields({
        name: 'Fast-typer',
        value: 'Sends a random sentence that you must write within 60 seconds'
      },
      {
        name: 'Shuffle-guess',
        value: "Sends a shuffled word for you to guess\n**Note: The real word option isn't working. If you can't guess the word cancel the game**"
      }
      )
      message.channel.send(embed)
      return
    }
    if(section === 'moderation') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Economy commands for FNFBot')
      .setThumbnail('https://cdn.discordapp.com/attachments/831784738603401219/835822847057461248/MaxPixel.png')
      .setFooter(`The prefix for this server is ${result ? result.prefix : globalPrefix}`)
      .setImage('https://cdn.discordapp.com/attachments/760831596092981258/841696280409014323/petpet.gif')
      .addFields({
        name: 'Warn',
        value: 'Warns the target user. Warns are not cleared upon leaving so warn evading is not possible\nOnly usable by Administrators'
      },
      {
        name: 'Kick',
        value: 'Kicks the target user\nOnly usable by Administrators'
      },
      {
        name: 'Ban',
        value: 'Bans the target user\nOnly usable by Administrators'
      },
      {
        name: 'Setslowmode',
        value: 'Sets the slowmode to the specified value\n**Please write the time value after the number**\nExample: 5s, 2m, 2 minutes, 5h etc.'
      },
      {
        name: 'Warns / Warnings',
        value: 'Lists the warns of the target user\nUsable by anybody'
      }
      )
      message.channel.send(embed)
      return
    }
    if(section === 'misc' || section === 'miscellaneous') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Economy commands for FNFBot')
      .setThumbnail('https://cdn.discordapp.com/attachments/831784738603401219/835822847057461248/MaxPixel.png')
      .setFooter(`The prefix for this server is ${result ? result.prefix : globalPrefix}`)
      .setImage('https://cdn.discordapp.com/attachments/760831596092981258/841696280409014323/petpet.gif')
      .addFields({
        name: 'Avatar',
        value: 'Gets the avatar of the target user'
      },
      {
        name: 'DoubleSadge / DS',
        value: 'Deletes the command with the messages and sends your username with the emoji after it',
        inline: true
      },
      {
        name: 'Sadge',
        value: 'Deletes the command with the messages and sends your username with the emoji after it',
        inline: true
      },
      {
        name: 'Kek',
        value: 'Deletes the command with the messages and sends your username with the emoji after it',
        inline: true
      },
      {
        name: 'Pog',
        value: 'Deletes the command with the messages and sends your username with the emoji after it',
        inline: true
      },
      {
        name: 'Yes / OK',
        value: 'Deletes the command with the messages and sends your username with the emoji after it',
        inline: true
      },
      {
        name: 'Botinfo',
        value: 'Sends a bunch of statistics about the bot'
      },
      {
        name: 'Define',
        value: 'Searches Urban Dictionary for the definition of your word(s)'
      },
      {
        name: 'Say',
        value: 'Make the bot say something'
      },
      {
        name: 'Ping',
        value: "Measures the response time of the bot"
      },
      {
        name: 'Fact',
        value: "Sends a random Friday Night Funkin' fact",
        inline: true
      },
      {
        name: 'Hell',
        value: 'Sends a GIF showing the hell of every FNF player',
        inline: true
      },
      {
        name: 'Serverinfo',
        value: 'Sends some information about the server'
      },
      {
        name: 'Servers',
        value: 'Sends a list containing all of the servers the bot is included in'
      }
      )
      message.channel.send(embed)
      return
    }
    if(section === 'suggestions') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Suggestion commands for FNFBot')
      .setThumbnail('https://cdn.discordapp.com/attachments/831784738603401219/835822847057461248/MaxPixel.png')
      .setFooter(`The prefix for this server is ${result ? result.prefix : globalPrefix}`)
      .setImage('https://cdn.discordapp.com/attachments/760831596092981258/841696280409014323/petpet.gif')
      .addFields({
        name: 'Setsuggestions / Setsuggestion',
        value: 'Sets the suggestions channel (only 1 per server)\n**Make sure you use the command in the channel where you want it!**'
      },
      {
        name: 'Suggestion accepted / denied / waiting',
        value: `Changes the status of the message if the suggestion is accepted / denied\nHow to use: \n1. Get the message ID using Copy ID (if you don't see it enable developer mode in your options)\n2. Use the command: ${result ? result.prefix : globalPrefix}suggestion <Message ID> <Status (denied / accepted)> <[Reason (optional)]>`
      }
      )
      message.channel.send(embed)
    }
  }
}
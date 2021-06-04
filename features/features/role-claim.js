const firstMessage = require('@util/first-message')

module.exports = (client) => {
  const channelId = '760830173871865857'

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    thumbs_up_surge: 'Member',
  }

  const reactions = []

  let emojiText = "Server Rules: \n\n1. Treat All Members With Respect\n    ‣ No harassment or bullying\n    ‣ No releasing others' personal info\n    ‣ No racism, sexism, homophobia, etc.\n    ‣ No depictions of graphic or sexual violence\n    ‣ No harmful messages through DMs\n    ‣ No impersonation of other members\n\n2. No Spamming\n    ‣ No repetitive messages\n    ‣ No excessive or unnecessary pings\n    ‣ No using bot commands in non bot channels\n    ‣ Spamming is ONLY allowed in <#760831724585746502> \n\n3. Respect The Moderators\n    ‣ No intentional violation of the rules\n    ‣ No encouraging others to break the rules\n    ‣ No arguing with the mod's decisions (if you feel you were unfairly punished, DM <@366287962339803136>)\n    ‣ Any moderator can give a higher or lower punishment at any time based on the offense\n    ‣ No pinging mods unless they are needed\n\n4. Stay On Topic\n    ‣ No using <#760830547986481193> to discuss topics that have their own channels\n    ‣ Any use of bots should stay in <#760831596092981258>  \n    ‣ Only ask for teammates in <#760831656441020436>\n    ‣ You can talk about anything in <#764654158321942578>\n    ‣ No bringing up topics that break other rules in any channel\n\n5. Consequences\n    ‣ Moderators can punish any violators of these rules however they feel is adequate (Mute, Warn, Ban)\n    ‣ 2 warns will result in a mute\n    ‣ 2 mutes will result in a temporary ban\n    ‣ 2 temporary bans will result in a permanent ban from the server\n\nThank you for your compliance.\nReact below this message to gain access to the rest of the server! (if you don't receive the member role please DM a moderator and wait to get the role)\n\n"
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} = ${role}\n`
  }

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === '723819104045105172') {
      return
    }

    const emoji = reaction._emoji.name

    const { guild } = reaction.message

    const roleName = emojis[emoji]
    if (!roleName) {
      return
    }

    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}

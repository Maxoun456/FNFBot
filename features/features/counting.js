module.exports = (client) => {
     const countingChannels = ['775714900285980692']
     client.on('message', message => {
          var previousString = ''
          const currentString = message.content
          const currentNumber = parseInt(currentString)
          if(countingChannels.includes(message.channel.id)){
          message.channel.messages.fetch({before: message.id, limit: 1}).then(msg => {
               previousString = msg.first().content
               const previousNumber = parseInt(previousString)
               var difference = currentNumber - previousNumber
               if(difference !== 1 && message.author.id !== '822098983992033282') {
                    message.delete()
                    message.channel.send(`Please count right <@${message.author.id}>`).then(msg => msg.delete({timeout: 3000}))
                    return
               }
               if(message.author.id === msg.first().author.id && message.author.id !== '822098983992033282') {
                    message.delete()
                    message.channel.send(`Please wait for someone else to count <@${message.author.id}>`).then(msg => msg.delete({timeout: 3000}))
                    return
               }
          })
     }
          else {
               return
          }
     })    
}
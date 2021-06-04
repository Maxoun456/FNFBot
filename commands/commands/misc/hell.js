module.exports = {
    commands: 'hell',
    description: 'Sends the hell every FNF player felt',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.channel.send('https://tenor.com/view/mom-fnf-friday-night-funkin-newgrounds-funny-rapping-boyfriend-gif-19812037')
    },
}
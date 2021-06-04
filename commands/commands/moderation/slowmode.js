const ms = require('ms')

module.exports = {
    commands: 'setslowmode',
    permissions: 'ADMINISTRATOR',
    callback: (message, args) => {
        const { channel } = message
        if(!args.length){
            message.channel.send('Please specify a duration to set')
            return
        }
        let duration = args.join(' ')
        var durationmili = ms(duration)
        if(args[0] === 'off') {
            args[0] = 0
        }
        if(isNaN(parseInt(args[0]))) {
            message.channel.send('Please specify a valid duration')
            return
        }
        if(parseInt(durationmili) > 21600000) {
            message.channel.send('Invalid value! Maximum value: 6 hours')
            return
        }
        if(parseInt(durationmili) < 0) {
            message.channel.send('Invalid value! Minimum value: 0 ms')
            return
        }
        channel.setRateLimitPerUser(durationmili / 1000)
        if(args[0] === '0' || args[0] === 'off') {
            message.channel.send('Successfully disabled slowmode')
            return
        }
        message.channel.send(`Successfully set the slowmode to **${ms(durationmili, {long: true})}**`)
    }
}
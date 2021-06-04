const mongoose = require('mongoose')

const pollSchema = {
    guildId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    }
}

module.exports = mongoose.model('poll-channels', pollSchema)
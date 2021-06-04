const mongoose = require('mongoose')

const tournamentSchema = {
    guildId: {
        type: String,
        required: true
    },
    teamName:{
        type: String,
        required: true
    },
    teamMembers: {
        type: [String],
        required: true
    }
}

module.exports = mongoose.model('tournament-teams', tournamentSchema)
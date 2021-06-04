const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const modLogSchema = mongoose.Schema({
    _id: reqString, //Guild ID
    channelId: reqString,
    roleName: reqString
})

module.exports = mongoose.model('mod-log-channels', modLogSchema)
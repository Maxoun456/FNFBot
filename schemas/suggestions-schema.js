const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const suggestionSchema = mongoose.Schema({
    //guild id
    _id: reqString,
    channelId: reqString
})

module.exports = mongoose.model('suggestion-channels', suggestionSchema)
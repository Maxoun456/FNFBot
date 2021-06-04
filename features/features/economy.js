const mongo = require('@util/mongo')
const profileSchema = require('@schemas/profile-schema')

const coinsCache = {}

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, userTag, coins) => {
    return await mongo().then(async (mongoose) => {
        const result = await profileSchema.findOneAndUpdate({
            guildId,
            userId
        }, {
            guildId,
            userId,
            userTag,
            $inc: {
                coins
            }
        }, {
            upsert: true,
            new: true
        })

        coinsCache[`${guildId}-${userId}`] = result.coins

        return result.coins
    })
}

module.exports.getCoins = async (guildId, userId, userTag) => {
    const cachedValue = coinsCache[`${guildId}-${userId}`]
    if (cachedValue) {
        return cachedValue
    }
    return await mongo().then(async mongoose => {

        const result = await profileSchema.findOne({
            guildId,
            userId
        })

        let coins = 0
        if(result){
            coins = result.coins
        } else {
            console.log('Inserting a document...')
            await new profileSchema({
                guildId,
                userId,
                userTag,
                coins: 0
            }).save()
        }
        coinsCache[`${guildId}-${userId}`] = coins

        return coins;
    })
}
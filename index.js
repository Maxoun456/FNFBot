require('module-alias/register')
require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
client.setMaxListeners(0);
const config = require('@root/config.json')
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const loadFeatures = require('@root/features/load-features')
const mongo = require('@util/mongo')
const mongoose = require('mongoose')
const { mongoPath } = require('@root/config.json')
const command = require('@util/command');
const { dir } = require('console');
client.on('ready', () => {
    console.log('FNFBot went online!'); 
    client.user.setPresence({
            activity: {
                name: "Friday Night Funkin'",
                type: 0,
            },
        })
        commandBase.loadPrefixes(client)
        loadCommands(client)
        loadFeatures(client)
})
client.login(process.env.TOKEN);

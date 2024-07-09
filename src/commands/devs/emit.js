const { ApplicationCommandType } = require('discord.js')

module.exports = {
    name: 'emit',
    description: '(💡) Devs',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args, con) => {
    client.emit('guildCreate', interaction.guild)
    }
}
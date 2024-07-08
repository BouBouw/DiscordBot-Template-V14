const { ApplicationCommandType } = require('discord.js')

module.exports = {
    name: 'rank',
    description: '(💡) Utils',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args, con) => {
    interaction.reply({
        content: `Rank: 0\nExp: 0`
    })
    }
}
const { ApplicationCommandType, Colors } = require('discord.js')

module.exports = {
    name: 'profile',
    description: '(💡) Utils',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args, con) => {
    interaction.reply({
        embeds: [{
            color: Colors.Blue,
            title: `${interaction.user.username}'s Profile`
        }]
    })
    }
}
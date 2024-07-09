const { ApplicationCommandType, Colors } = require('discord.js');
const Levels = require('../../../handlers/functions/database/Levels');

module.exports = {
    name: 'rank',
    description: '(💡) Utils',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args, con) => {
    const currentProfile = await Levels.ProfileExperienceManager(interaction.guild, interaction.user);

    interaction.reply({
        embeds: [{
            color: Colors.Purple,
            title: `${interaction.user.username}'s Rank`,
            fields: [
                {
                    name: `Level :`,
                    value: `Rank : ${currentProfile.currentRank.currentLevel.name}\nExp : ${currentProfile.currentExp}`
                }
            ]
        }]
    })
    }
}
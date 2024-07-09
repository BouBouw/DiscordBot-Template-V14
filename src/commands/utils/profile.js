const { ApplicationCommandType, Colors } = require('discord.js')
const Levels = require('../../../handlers/functions/database/Levels')

module.exports = {
    name: 'profile',
    description: '(💡) Utils',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args, con) => {
    const currentProfile = await Levels.ProfileExperienceManager(interaction.guild, interaction.user);

    interaction.reply({
        embeds: [{
            color: Colors.Purple,
            title: `${interaction.user.username}'s Profile`,
            thumbnail: {
                url: interaction.user.avatarURL(),
            },
            fields: [
                {
                    name: `Level :`,
                    value: `Rank : ${currentProfile.currentRank.currentLevel.name}\nExp : ${currentProfile.currentExp}`
                }
            ],
            image: {
                url: `attachment://${currentProfile.rankData.image_banner.name}`
            }
        }],
        files: [ currentProfile.rankData.image_banner ]
    })
    }
}
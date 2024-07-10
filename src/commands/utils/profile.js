const { ApplicationCommandType, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const moment = require('moment');

const Levels = require('../../../handlers/functions/database/Levels');
const LangageManager = require('../../../handlers/langs/langageDetector');

module.exports = {
    name: 'profile',
    description: '(💡) Utils',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args, con) => {
    const currentProfile = await Levels.ProfileExperienceManager(interaction.guild, interaction.user);

    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`${interaction.user.username}'s Profile`)
        .setURL(`http://localhost:90/profile/${interaction.user.id}`)
        .setStyle(ButtonStyle.Link)
    )

    interaction.reply({
        embeds: [{
            color: Colors.Purple,
            title: `${interaction.user.username}'s Profile`,
            thumbnail: {
                url: interaction.user.avatarURL(),
            },
            fields: [
                {
                    name: `⚙️ Global :`,
                    value: `
                    ${interaction.member} (\`${interaction.member.id}\`)
                    Created At : ${moment(interaction.user.createdAt).format('DD/MM/YYYY')}
                    Langage : ${await LangageManager.LangageSelector(await LangageManager.UserLanguageDetector(interaction.user.id))}
                    `
                },
                {
                    name: `🌎 Server :`,
                    value: `
                    Joined At : ${moment(interaction.user.joinedAt).format('DD/MM/YYYY')}
                    Bot : ${interaction.user.bot ? 'True' : 'False'}
                    Booster : ${interaction.member.premiumSince ? 'True' : 'False'}
                    `
                },
                {
                    name: `📊 Level :`,
                    value: `
                    Rank : ${currentProfile.currentRank.currentLevel.name}
                    Exp : ${currentProfile.currentExp}
                    `
                }
            ],
            image: {
                url: `attachment://${currentProfile.rankData.image_banner.name}`
            }
        }],
        files: [ currentProfile.rankData.image_banner ],
        components: [ row ],
    });

    }
}
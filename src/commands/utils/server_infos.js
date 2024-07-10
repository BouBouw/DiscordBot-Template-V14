const { ApplicationCommandType, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const moment = require('moment');

const LangageManager = require('../../../handlers/langs/langageDetector');

module.exports = {
    name: 'server-infos',
    description: '(💡) Utils',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args, con) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`${interaction.guild.name}'s Informations`)
        .setURL(`http://localhost:90/servers/${interaction.guild.id}`)
        .setStyle(ButtonStyle.Link)
    )

    interaction.reply({
        embeds: [{
            color: Colors.Purple,
            title: `${interaction.guild.name}'s Informations`,
            thumbnail: {
                url: interaction.guild.iconURL(),
            },
            fields: [
                {
                    name: `⚙️ Global :`,
                    value: `
                    ${interaction.guild.name} (\`${interaction.guild.id}\`)
                    Created At : ${moment(interaction.guild.createdAt).format('DD/MM/YYYY')}
                    Langage : ${await LangageManager.LangageSelector(await LangageManager.GuildLanguageDetector(interaction.guild.id))}
                    `
                },
                {
                    name: `🌎 Server :`,
                    value: `
                    Owner : <@${interaction.guild.ownerId}> (\`${interaction.guild.ownerId}\`)
                    Members : ${interaction.guild.memberCount}
                    Bot : X
                    `
                },
                {
                    name: `📊 Boosts :`,
                    value: `
                    Level : ${interaction.guild.premiumTier}
                    Boosts Count : ${interaction.guild.premiumSubscriptionCount}
                    `
                }
            ],
        }],
        components: [ row ],
    });
    }
}
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js');
const GetAllCommands = require('../../../handlers/functions/GetAllCommands');

module.exports = {
    name: 'help',
    description: '(💡) Utils',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args, con) => {
    let page = 0;
    await GetAllCommands(client);

    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('Help.FirstPage')
        .setEmoji('⏪')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId('Help.PreviousPage')
        .setEmoji('◀️')
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setCustomId('Help.Delete')
        .setEmoji('🗑️')
        .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
        .setCustomId('Help.NextPage')
        .setEmoji('▶️')
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setCustomId('Help.LastPage')
        .setEmoji('⏩')
        .setStyle(ButtonStyle.Secondary),
    )

    const row_1 = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId("Help.Settings")
        .setLabel('Settings')
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setLabel('Documentation')
        .setURL("http://localhost:90/documentation")
        .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
        .setLabel('Website')
        .setURL("http://localhost:90/home")
        .setStyle(ButtonStyle.Link),
    )

    interaction.reply({
        embeds: [{
            color: Colors.Orange,
            title: `Help Page :`,
            fields: [
                {
                    name: `Categorie`,
                    value: `Commands`
                }
            ],
            footer: {
                text: `Page : ${page}/0`
            }
        }],
        components: [ row, row_1 ]
    }).then(async (msg) => {
        
    })
    }
}
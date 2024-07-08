const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'clear',
    description: '(⚙️) Mods',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "number",
            description: "number of messages",
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
execute: async (client, interaction, args, con) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: `No permission`, epehemeral: true });

    const count = interaction.options.getNumber("number");
    if(isNaN(count) && !Number(count) || count > 99) return interaction.reply({ content: `args no valid`, epehemeral: true });

    await interaction.channel.bulkDelete(Math.floor(count + 1)).then(async () => {
        await interaction.channel.send({ content: `Clear **${count}** message(s).` })
    });

    }
}

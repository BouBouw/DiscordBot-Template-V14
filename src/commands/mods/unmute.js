const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: '(⚙️) Mods',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Member',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
execute: async (client, interaction, args, con) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) return interaction.reply({ content: `No permission`, epehemeral: true });

    const user = interaction.options.getMember('user');

    user.timeout(null).then(() => {
        interaction.reply({
            content: `${user.username} has been unmuted.`
        });
    })

    }
}
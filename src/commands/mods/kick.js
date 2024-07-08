const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const Punishments = require('../../../handlers/functions/database/Punishments');

module.exports = {
    name: 'kick',
    description: '(⚙️) Mods',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Member',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "reason",
            description: "Reason",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
execute: async (client, interaction, args, con) => {
    // typeInt : 2
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply({ content: `No permission`, epehemeral: true });

    const user = interaction.options.getMember('user');
    const reason = interaction.options.getString("reason") || '';

    await user.kick({ reason: reason }).then(() => {
        interaction.reply({
            content: `${user.username} has been kicked.`
        });

        Punishments.SetPunishment(interaction.guild.id, user.id, reason, 2);
    });

    }
}
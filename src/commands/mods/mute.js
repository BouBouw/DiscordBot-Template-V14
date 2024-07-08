const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const Punishments = require('../../../handlers/functions/database/Punishments');

module.exports = {
    name: 'mute',
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
            name: 'time',
            description: 'Time',
            type: ApplicationCommandOptionType.String,
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
    // TypeInt : 0
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) return interaction.reply({ content: `No permission`, epehemeral: true });

    const user = interaction.options.getMember('user');
    if(user.isCommunicationDisabled()) return interaction.followUp({ content: `Already muted.` });

    const time = interaction.options.getString('time');
    if(ms(time) > 2419200000 || ms(time) < 10000) return interaction.reply({ content: `Time invalid.`, epehemeral: true });

    const reason = interaction.options.getString("reason") || '';

    user.disableCommunicationUntil(Date.now() + (duration), `${reason}`).then(() => {
        interaction.reply({
            content: `${user.username} has been muted.`
        });

        Punishments.SetPunishment(interaction.guild.id, user.id, reason, 0);
    });

    }
}
const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'unban',
    description: '(⚙️) Mods',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'id',
            description: 'User ID',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
execute: async (client, interaction, args, con) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: `No permission`, epehemeral: true });

    const user_id = interaction.options.getNumber('id');

    interaction.guild.members.unban(user_id).then(() => {
        interaction.reply({
            content: `${user.username} has been unbanned.`
        });
    })
    .catch((err) => {
        interaction.reply({
            content: `${user.username} not found banned user with id : \`${user_id}\`.`
        });
    })
    }
}
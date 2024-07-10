const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const documentation = require('discord.js-docs');

require('dotenv').config()

module.exports = {
    name: 'emit',
    description: '(🛡️) Devs',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "events",
            description: "Event",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'ready',
                    value: 'ready'
                },
                {
                    name: 'interactionCreate',
                    value: 'interactionCreate'
                },
                {
                    name: 'messageCreate',
                    value: 'messageCreate'
                },
                {
                    name: 'messageDelete',
                    value: 'messageDelete'
                },
                {
                    name: 'messageUpdate',
                    value: 'messageUpdate'
                },
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                },
                {
                    name: 'guildMemberUpdate',
                    value: 'guildMemberUpdate'
                },
                {
                    name: 'channelCreate',
                    value: 'channelCreate'
                },
                {
                    name: 'channelDelete',
                    value: 'channelDelete'
                },
                {
                    name: 'channelUpdate',
                    value: 'channelUpdate'
                },
                {
                    name: 'emojiCreate',
                    value: 'emojiCreate'
                },
                {
                    name: 'emojiDelete',
                    value: 'emojiDelete'
                },
                {
                    name: 'emojiUpdate',
                    value: 'emojiUpdate'
                },
                {
                    name: 'guildBanAdd',
                    value: 'guildBanAdd'
                },
                {
                    name: 'guildBanRemove',
                    value: 'guildBanRemove'
                },
                {
                    name: 'guildCreate',
                    value: 'guildCreate'
                },
                {
                    name: 'guildDelete',
                    value: 'guildDelete'
                },
                {
                    name: 'guildUpdate',
                    value: 'guildUpdate'
                },
                {
                    name: 'roleCreate',
                    value: 'roleCreate'
                },
                {
                    name: 'roleDelete',
                    value: 'roleDelete'
                },
                {
                    name: 'roleUpdate',
                    value: 'roleUpdate'
                },
                {
                    name: 'threadCreate',
                    value: 'threadCreate'
                },
                {
                    name: 'threadDelete',
                    value: 'threadDelete'
                },
                {
                    name: 'threadUpdate',
                    value: 'threadUpdate'
                },
            ]
        },
    ],
execute: async (client, interaction, args, con) => {
    if(!process.env.DEVELOPERS.includes(interaction.user.id)) return interaction.reply({ content: `No permission`, epehemeral: true });

    const event = interaction.options.getString('events');

    const doc = await documentation.fetch('stable');
    const result = doc.search(event);
    console.log(result[0])

    client.emit(event, interaction.guild)
    }
}
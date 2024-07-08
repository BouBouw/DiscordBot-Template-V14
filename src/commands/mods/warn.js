const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const Punishments = require('../../../handlers/functions/database/Punishments');
const db = require('../../../handlers/functions/Database');

module.exports = {
    name: 'warn',
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
            name: "type",
            description: "Type",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Add',
                    value: 'Warns.Add'
                },
                {
                    name: 'Remove',
                    value: 'Warns.Remove'
                },
                {
                    name: 'Reset',
                    value: 'Warns.Reset'
                },
                {
                    name: 'List',
                    value: 'Warns.List'
                }
            ]
        },
        {
            name: "reason",
            description: "Reason",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
execute: async (client, interaction, args, con) => {
    // TypeInt : 1
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ content: `No permission`, epehemeral: true });
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString("reason") || '';

    const type = interaction.options.getString("type");
    switch(type) {
        case 'Warns.Add': {
            interaction.reply({
                content: `${user.username} has been warn.`
            });

            Punishments.SetPunishment(interaction.guild.id, user.id, reason, 1)
            break;
        }

        case 'Warns.Remove': {
            con.query(`SELECT * FROM punishments WHERE guild_id = '${interaction.guild.id}' AND user_id = '${user.id}' AND typeInt = '1'`, function(err, result) {
                if(err) throw err;

                console.log(result)
                if(!result[0]) return interaction.reply({ content: `No warn for ${user.username}.` });

                const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                    .addOptions(
                        result.map((item, index) => {
                            return new StringSelectMenuOptionBuilder()
                            .setLabel(`#${String(item.id)}`)
                            .setDescription(String(item.reason))
                            .setValue(String(item.id));
                        })
                    )
                )

                interaction.reply({
                    content: `Select warn :`,
                    components: [ row ]
                }).then(async (msg) => {
                    const filter = (i) => i.user.id === interaction.member.id;
                    await Selects();

                    async function Selects() {
                        let collected;
                        try {
                            collected = await msg.awaitMessageComponent({ filter: filter });
                        } catch(err) {
                            if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                return msg.delete();
                            }
                        }

                        interaction.reply({ content: `${user.username} has been unwarned (#${collected.values[0]})` });

                        Punishments.DelPunishment(interaction.guild.id, user.id, collected.values[0]);
                    };
                })
            })
            break;
        }

        case 'Warns.Reset': {
            interaction.reply({
                content: `warn of ${user.username} has been reset.`
            });

            Punishments.ResetPunishment(interaction.guild.id, user.id, 1);
            break;
        }

        case 'Warns.List': {
            break;
        }
    }
    }
}
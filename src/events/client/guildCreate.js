const GuildsManager = require("../../../handlers/functions/GuildsManager")

module.exports = {
	name: 'guildCreate',
	once: false,
execute: async (guild, client, con) => {
    await GuildsManager.NewGuild(guild);
    }
}
const Levels = require("../../../handlers/functions/database/Levels");

module.exports = {
	name: 'messageCreate',
	once: false,
execute: async (message, client, con) => {
    if(!message.guild) return;

    await Levels.ExperienceManager(message);
    }
}
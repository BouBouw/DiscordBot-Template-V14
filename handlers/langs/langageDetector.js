module.exports = {
    async GuildLanguageDetector(guildID, con) {
        return new Promise(async (resolve, reject) => {
            con.query(`SELECT * FROM guilds WHERE guild_id = '${guildID}'`, function(err, result) {
                const lang = result[0].language;
        
                return resolve(lang);
            });
        })
    }
};

module.exports = {
    async UserLanguageDetector(userID, con) {
        return new Promise(async (resolve, reject) => {
            con.query(`SELECT * FROM users WHERE discord_id = '${userID}'`, function(err, result) {
                const lang = result[0].language;
        
                return resolve(lang);
            });
        })
    }
};
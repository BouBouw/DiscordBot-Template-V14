const db = require("../functions/Database");

const GuildLanguageDetector = async (guild_id) => {
    return new Promise((resolve, reject) => {
        db.sql().query(`SELECT * FROM guilds WHERE guild_id = '${guild_id}'`, function(err, result) {
            if(err) {
                reject(err)
            } else {
                return resolve(result[0].language);
            }
        })
    })
}

const UserLanguageDetector = async (user_id) => {
    return new Promise(async (resolve, reject) => {
        db.sql().query(`SELECT * FROM users WHERE user_id = '${user_id}'`, function(err, result) {
            if(err) {
                reject(err)
            } else {
                return resolve(result[0].language);
            }
        });
    })
}

const LangageSelector = (lang) => {
    return new Promise((resolve, reject) => {
        switch(lang) {
            case 'EN_en': {
                resolve("English");

                break;
            }

            case 'FR_fr': {
                resolve("Français");
                
                break;
            }
        }
    })
}

const LangageManager = {
    GuildLanguageDetector,
    UserLanguageDetector,
    LangageSelector
}

module.exports = LangageManager;
const db = require("../../../../handlers/functions/Database");

const CurrentSettings = (guildID) => {
    console.log(guildID)
    return new Promise((resolve, reject) => {
        db.sql().query(`SELECT * FROM guilds WHERE guild_id = '${guildID}'`, function(err, result) {
            if(err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        })
    })
}

const Utils = {
    CurrentSettings
}

module.exports = Utils;
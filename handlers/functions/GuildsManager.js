const db = require('./Database');

const NewGuild = (guild) => {
    return new Promise((resolve, reject) => {
        db.sql().query(`SELECT * FROM guilds WHERE guild_id = '${guild.id}'`, function(err, result) {
            if(err) {
                reject(err);
            } else {
                if(!result[0]) {
                    db.sql().query(`INSERT INTO guilds (guild_id) VALUES ('${guild.id}')`, function(err, result) {
                        try {
                            SaveMembers(guild);
                        } catch(err) {
                            reject(err);
                        }
                        resolve(result);
                    })
                } else {
                    resolve(result[0])
                }
            }
        })
    });
};

const SaveMembers = (guild) => {
    return new Promise((resolve, reject) => {
        guild.members.cache.forEach(async (member) => {
            if(member.user.bot === true) return;
            
            db.sql().query(`INSERT INTO users (guild_id, user_id) VALUES ('${guild.id}', '${member.user.id}')`, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });
};

const GuildsManager = {
    NewGuild,
};

module.exports = GuildsManager;
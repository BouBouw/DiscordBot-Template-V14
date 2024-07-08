const db = require("../Database");

const ranks = require('./ranks.json');

const ExperienceManager = (message) => {
    return new Promise((resolve, reject) => {
        db.sql().query(`SELECT * FROM users WHERE guild_id = '${message.guild.id}' AND user_id = '${message.author.id}'`, function(err, result) {
            if(err) {
                reject(err);
            } else {                
                let currentExp = Number(result[0].experience);
                const randomExp = Math.floor(Math.random() * 100) + 1;

                db.sql().query(`UPDATE users SET experience = '${Math.floor(currentExp + randomExp)}' WHERE guild_id = '${message.guild.id}' AND user_id = '${message.author.id}'`, function(err, result) {
                    RanksManager(currentExp, Math.floor(currentExp + randomExp), message.channel);
                    resolve(result);
                });
            }
        })
    });
};

const RanksManager = async (previousExp, currentExp, channel) => {
    ranks.levels.map((item, index) => {
        console.log(item)
        if(previousExp < item.experience && currentExp >= item.experience) {
            return channel.send({
                content: `You just up to next level : **${item.name}**`
            });
        }
    })
}

const Levels = {
    ExperienceManager,
    RanksManager
}

module.exports = Levels;
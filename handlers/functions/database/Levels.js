const { AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");

const db = require("../Database");

const ranks = require('./ranks.json');

const GetExperience = (guild_id, user_id) => {
    return new Promise((resolve, reject) => {
        db.sql().query(`SELECT * FROM users WHERE guild_id = '${guild_id}' AND user_id = '${user_id}'`, function(err, result) {
            if(err) {
                reject(err)
            } else {
                if(!result[0]) {
                    UserManager(guild_id, user_id);

                    return resolve(0);
                }

                resolve(Number(result[0].experience));
            }
        })
    })
}

const ExperienceManager = (message) => {
    return new Promise(async (resolve, reject) => {
        const currentExp = await GetExperience(message.guild.id, message.author.id);
        const randomExp = Math.floor(Math.random() * 100) + 1;

        db.sql().query(`UPDATE users SET experience = '${Math.floor(currentExp + randomExp)}' WHERE guild_id = '${message.guild.id}' AND user_id = '${message.author.id}'`, function(err, result) {
            RanksManager(currentExp, Math.floor(currentExp + randomExp), message.channel);
            
            if(err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    });
};

const ProfileExperienceManager = (guild, user) => {
    return new Promise(async (resolve, reject) => {
        const currentExp = await GetExperience(guild.id, user.id);
        const currentRank = await RanksManager(currentExp, currentExp, false);

        // canvas banner
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('https://imgur.com/64vyfCx.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.font = '26px sans-serif';
	    context.fillStyle = '#ffffff';
	    context.fillText(`Badge(s) :`, 250, 75);

        context.font = '24px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(`Rank : ${currentRank.currentLevel.name}`, 250, 180);

        context.font = '20px sans-serif';
	    context.fillStyle = '#ffffff';
	    context.fillText(`${currentExp} exp.`, 570, 180);

        function drawRoundedRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        }

        context.fillStyle = '#000000';
        drawRoundedRect(context, 250, 190, 400, 20, 12.5);
        context.fill();

        context.fillStyle = '#ffffff';
        drawRoundedRect(context, 250, 190, (currentExp / currentRank.nextLevel.experience) * 400, 20, 12.5);
        context.fill();

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: 'jpg' }));
        context.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-rank.png' });

        const dataProfile = {
            currentExp: currentExp,
            currentRank: currentRank,
            rankData: {
                image_banner: attachment
            }
        };

        resolve(dataProfile);
    });
};

const RanksManager = (previousExp, currentExp, channel) => {
    return new Promise((resolve, reject) => {
        if(channel !== false) {  
            ranks.levels.map((item) => {
                if(previousExp < item.experience && currentExp >= item.experience) {
                    return channel.send({
                        content: `You just up to next level : **${item.name}**`
                    });
                };
            });
        } else {
            ranks.levels.map((item, index) => {
                if(currentExp >= item.experience && currentExp < ranks.levels[Math.floor(index + 1)] === undefined ? ranks.levels[ranks.levels.length] : ranks.levels[Math.floor(index + 1)] ) {
                    const data = {
                        currentLevel: item,
                        nextLevel: ranks.levels[Math.floor(index + 1)] === undefined ? ranks.levels[ranks.levels.length] : ranks.levels[Math.floor(index + 1)]
                    }
                    
                    return resolve(data);
                }
            })
        }
    })
};

const UserManager = (guild_id, user_id) => {
    return new Promise((resolve, reject) => {
        db.sql().query(`INSERT INTO users (guild_id, user_id) VALUES ('${guild_id}', '${user_id}')`, function(err, result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

const Levels = {
    ExperienceManager,
    ProfileExperienceManager
}

module.exports = Levels;
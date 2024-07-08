const db = require("../Database");

const SetPunishment = (guild_id, user_id, reason, typeInt) => {
    return new Promise((resolve, reject) => {
        db.sql().query(`INSERT INTO punishments (guild_id, user_id, reason, typeInt) VALUES ('${guild_id}', '${user_id}', '${reason}', '${typeInt}')`, function(err, result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};

const DelPunishment = (guild_id, user_id, idInt) => {
    return new Promise((resolve, reject) => {
        db.sql().query(`DELETE FROM punishments WHERE id = '${idInt}' AND guild_id = '${guild_id}' AND user_id = '${user_id}'`, function(err, result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};

const ResetPunishment = (guild_id, user_id, typeInt) => {
    return new Promise((resolve, reject) => {
        db.sql().query(`DELETE FROM punishments WHERE guild_id = '${guild_id}' AND user_id = '${user_id}' AND typeInt = '${typeInt}'`, function(err, result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

const Punishments = {
    SetPunishment,
    DelPunishment,
    ResetPunishment
}

module.exports = Punishments;
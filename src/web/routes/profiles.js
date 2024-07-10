const express = require('express');
const checkAuth = require('../functions/checkAuth');

const client = require('../../../index');
const db = require('../../../handlers/functions/Database');
const Utils = require('../functions/database/Utils');

const router = express.Router();

router.get('/profiles/:userId', checkAuth, async (req, res) => {
    const user = req.client.users.cache.get(req.params.userId);
    if (!user) return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=1327223339031&guild_id=${req.params.guildId}`);

    const settings = await Utils.CurrentSettings(req.params.guildId);

    res.render("Dashboard/Servers", {
        bot: req.client.user,
        user: req.user,
        bot: db.sql(),
        server: {
            guild,
            settings
        } ,
        invite: `https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&permissions=327223339031&scope=bot%20applications.commands`,
    });
});

module.exports = router;
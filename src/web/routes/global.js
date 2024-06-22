const express = require('express');
const checkAuth = require('../functions/checkAuth');

const client = require('../../../index');
const connection = require('../../../index');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('Welcome', {
        user: req.user,
        bot: client,
        db: connection
    })
});

router.get('/home', async (req, res) => {
    res.render('Welcome', {
        user: req.user,
        bot: client,
        db: connection
    })
});

router.get('/documentation', async (req, res) => {
    res.render('Documentation', {
        user: req.user,
        bot: client,
        db: connection
    })
});

router.get('/dashboard', checkAuth, async (req, res) => {
    res.render('Dashboard/Main', {
        user: req.user || null,
        bot: client,
        db: connection
    })
});

module.exports = router;
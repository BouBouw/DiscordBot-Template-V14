const express = require('express');
const { client, connection } = require('../../../index');
const checkAuth = require('../functions/checkAuth');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('Welcome', {
        user: req.user,
        client: client,
        db: connection
    })
});

router.get('/home', async (req, res) => {
    res.render('Welcome', {
        user: req.user,
        client: client,
        db: connection
    })
});

router.get('/documentation', async (req, res) => {
    res.render('Documentation', {
        user: req.user,
        client: client,
        db: connection
    })
});

router.get('/dashboard', checkAuth, async (req, res) => {
    res.render('Dashboard/Main', {
        user: req.user || null,
        client: client,
        db: connection
    })
});

module.exports = router;
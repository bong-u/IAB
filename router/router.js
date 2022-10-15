const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/', (req, res) => {
    res.render('index', { routerName : 'main'} );
});
router.get('/asset', (req, res) => {
    res.render('index', { routerName : 'asset'} );
});
router.get('/stats', (req, res) => {
    res.render('index', { routerName : 'stats'} );
});

module.exports = router;
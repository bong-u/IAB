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
router.get('/add_item', (req, res) => {
    res.render('index', { routerName : 'add_item'} );
});

module.exports = router;
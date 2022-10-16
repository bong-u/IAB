const express = require('express');
const router = express.Router();
const asset_list = [
    { name: "Asset1", money: "1000",    type: "card",    color: "#FFD1D1" },
    { name: "Asset2", money: "2000",    type: "account", color: "#F9F7CF"},
    { name: "Asset3", money: "3000000", type: "payment", color: "#CCF3EE"},
    { name: "Asset4", money: "40000",   type: "card",    color: "#C8DBBE"},
    { name: "Asset5", money: "15000",   type: "account", color: "#9ADCFF"},
    { name: "Asset6", money: "250",     type: "payment", color: "#F0D9FF"
    },
];

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/', (req, res) => {
    res.render('index', { routerName : 'home'} );
});
router.get('/asset', (req, res) => {
    res.render('index', { routerName : 'asset', asset_list : asset_list} );
});
router.get('/stats', (req, res) => {
    res.render('index', { routerName : 'stats'} );
});
router.get('/add_item', (req, res) => {
    res.render('index', { routerName : 'add_item', asset_list : asset_list} );
});

module.exports = router;
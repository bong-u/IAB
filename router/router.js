const express = require('express');
const ct = require('../controllers/controller.js');

const router = express.Router();
const expense_type = ['식비', '교통비', '공과금', '술'];

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/', (req, res) => {
    res.render('index', { routerName : 'home'} );
});
router.get('/asset', async (req, res) => {
    const asset_list = await ct.getAsset();
    res.render('index', {
        routerName : 'asset',
        asset_color : ct.ASSET_COLOR,
        asset_list : asset_list
    });
});
router.post('/asset', async (req, res) => {
    const asset_list = await ct.addAsset(req.body);
    return;
});
router.get('/stats', (req, res) => {
    res.render('index', { routerName : 'stats'} );
});
router.get('/add', async (req, res) => {
    const asset_list = await ct.getAsset();
    res.render('index', {
        routerName : 'add',
        asset_list : asset_list,
        expense_type : expense_type,
    } );
});

module.exports = router;
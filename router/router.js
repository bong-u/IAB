const express = require('express');
const ct = require('../controllers/controller.js');

const router = express.Router();
const expense_type_list = ['식비', '교통비', '공과금', '술'];

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'iab/build/index.html'));
});

router.post('/', async (req, res) => {
    const data = {
        asset_color_list : ct.ASSET_COLOR,
        asset_list : await ct.getAsset(),
        expense_type_list : expense_type_list,
    };
    res.send(data);
});

router.post('/asset', async (req, res) => {
    console.log (req.body);
    res.send (req.body);
});
router.post('/transaction', async (req, res) => {
    console.log (req.body);
    res.send (req.body);
});

module.exports = router;
const db = require('../db/db.js');

exports.getAsset = (req, res) => {
    const ASSET_TYPE = ['account', 'card', 'payment'];
    const ASSET_COLOR = ['#FFD1D1', '#F9F7CF', '#CCF3EE', '#C8DBBE', '#9ADCFF', '#F0D9FF', '#DDDDDD'];

    const process = (items) => {
        items.forEach((item) => {
            item.type = ASSET_TYPE[item.type];
            item.color = ASSET_COLOR[item.color];
        });
        return items;
    };

    db.serialize();
    let items = db.all('select * from asset', (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
            return;
        }
        items = process(row);
        res.render('index', { routerName: 'asset', asset_list : items });
    });
};

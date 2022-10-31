const db = require('../db/db.js');
const ASSET_COLOR =  ['#FFD1D1', '#F9F7CF', '#CCF3EE', '#C8DBBE', '#9ADCFF', '#F0D9FF', '#DDDDDD'];
const ASSET_TYPE = ['account', 'card', 'payment'];

exports.ASSET_COLOR = ASSET_COLOR;

exports.getAsset = async () => {
    const QUERY = 'select * from asset';
    
    db.serialize();
    return new Promise(function(resolve,reject){
        db.all(QUERY, function(err, rows){
            if (err) {
                console.log(err);
                res.status(500).send(err.message);
                return;
            }
            rows.forEach((item) => {
                item.type = ASSET_TYPE[item.type];
                item.color = ASSET_COLOR[item.color];
            });
            resolve(rows);
         });
    });
};

exports.addAsset = async (item) => {

    console.log (item);
    return;
    
    db.serialize();
    // return new Promise(function(resolve,reject){
    //     db.all(QUERY, function(err, rows){
    //         if (err) {
    //             console.log(err);
    //             res.status(500).send(err.message);
    //             return;
    //         }
    //         rows.forEach((item) => {
    //             item.type = ASSET_TYPE[item.type];
    //             item.color = ASSET_COLOR[item.color];
    //         });
    //         resolve(rows);
    //      });
    // });
};

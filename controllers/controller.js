const db = require('../db/db.js');
const ASSET_COLOR =  ['#FFD1D1', '#F9F7CF', '#CCF3EE', '#C8DBBE', '#9ADCFF', '#F0D9FF', '#DDDDDD'];
const ASSET_TYPE = ['account', 'card', 'payment'];

exports.ASSET_COLOR = ASSET_COLOR;

exports.getAsset = async (user_id) => {
    const query = `select * from asset where user_id = ${user_id}`;
    
    db.serialize();
    return new Promise(function(resolve, reject){
        db.all(query, function(err, rows){
            if (err) {
                console.error(err);
                return err;
            }
            rows.forEach((item) => {
                item.type = ASSET_TYPE[item.type];
                item.color = ASSET_COLOR[item.color];
            });
            resolve(rows);
         });
    });
};

exports.addAsset = async (user_id, item) => {
    console.log (item);
    
    const query = `insert into asset(name, type, money, color, user_id) values
        ('${item.name}', ${item.type}, ${item.money}, ${item.color}, ${user_id})`;
    
    db.serialize();
    return new Promise(function(resolve, reject){
        db.each(query, function(err){
            if (err) {
                console.error(err);
                return err;
            }
            resolve(item);
         });
    });
};

const bcrypt = require('bcrypt');
const db = require('../db/db.js');

exports.addUser = async (id, password) => {
    return new Promise(async (resolve, reject) => {
        salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt);
        const query = `insert into user (username, password) values
            ('${id}', '${password}')`;
        db.serialize();
        db.run(query);
        resolve();
    });
};
exports.searchUser = async (id, password, next) => {
    return new Promise((resolve, reject) => {
        const query = `select * from user where username = '${id}'`;
        db.serialize();
        db.all(query, async (err, row) => {
            if (err) reject(err);
            if (row.length === 0) {
                resolve(false);
                return;
            }

            const isUser = await bcrypt.compare(password, row[0].password);
    
            if (isUser)
                resolve(true);
            else
                resolve(false);
        });
        // const query = `select * from user`;
        // db.serialize();
        // db.all(query, async (err, row) => {
        //     console.log(row);
        // });
    });
};  
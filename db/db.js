const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/db.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Database Connected.');
    }
});

const drop_asset = 'drop table if exists asset';

const create_asset =`create table if not exists asset(
  id integer primary key autoincrement,
  name varchar(20),
  type integer,
  money integer,
  color integer)`;

const insert_asset = `insert into asset(name, type, money, color) values
  ('카카오뱅크', 0, 5000, 0),
  ('국민은행', 0, 15000, 2)`;


db.serialize(() => {
  db.each(drop_asset);
  db.each(create_asset);
  db.each(insert_asset);
});

// const close = () => {
//   db.close((err) =>{
//     if (err)
//       console.error(err.message);
//     console.log('Close the database connection.');
//   });
// }

module.exports = db;
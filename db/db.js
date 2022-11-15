const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/db.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database Connected.');
  }
});



const insert_asset = `insert into asset(name, type, money, color, user_id) values
('카카오뱅크', 0, 5000, 0, 1),
('국민은행', 0, 15000, 2, 1)`;

const create_user_table = `create table if not exists user(
  id integer primary key autoincrement,
  username varchar(20) unique,
  password varchar(64))`;

const create_asset_table = `create table if not exists asset(
  id integer primary key autoincrement,
  name varchar(20),
  type integer,
  money integer,
  color integer,
  user_id integer,
  foreign key (user_id) references user(id))`;

const create_transaction_table = `create table if not exists transaction_history(
  id integer primary key autoincrement,
  type integer,
  asset_id integer,
  expense_type integer,
  date varchar(20),
  money integer,
  content varchar(50),
  foreign key (asset_id) references asset(id))`;

const drop_table = 'drop table if exists asset';
const get = 'select * from transaction_history';

db.serialize(() => {
  // db.each(drop_table);
  db.each(create_user_table);
  db.each(create_asset_table);
  db.each(create_transaction_table);
  // db.each(insert_asset)
  // db.all(get, async (err, row) => {
  //   console.log(row);
  // })
});

// const close = () => {
//   db.close((err) =>{
//     if (err)
//       console.error(err.message);
//     console.log('Close the database connection.');
//   });
// }

module.exports = db;
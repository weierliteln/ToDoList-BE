const fs = require('fs')
const dbPath = './db/database.db'
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
)`)
})

//打印创造表的信息
db.all("SELECT * FROM users", (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows);
});

module.exports = db;


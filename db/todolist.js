const fs = require('fs')
const dbPath = './db/database.db'
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  // 创建表
  db.run(`CREATE TABLE IF NOT EXISTS list (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  over BOOLEAN NOT NULL,
  create_time TEXT NOT NULL,
  resolves_time TEXT NOT NULL
)`)
})

//打印创造表的信息
db.all("SELECT * FROM list", (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows);
});

module.exports = db;


const express = require('express')
const db = require('../db/todolist');

const router = express.Router()


// 查询todolist
router.get('/get/list', (req, res) => {
  const { over } = req.query;
  let sql = 'SELECT * FROM list ORDER BY create_time DESC';
  if (over === 'true') {
    sql = 'SELECT * FROM list WHERE over = 1 ORDER BY create_time DESC';
  }
  if (over === 'false') {
    sql = 'SELECT * FROM list WHERE over = 0 ORDER BY create_time DESC';
  }

  // 分页
  const { page, size } = req.query;
  if (page && size) {
    sql += ` LIMIT ${size} OFFSET ${(page - 1) * size}`;
  }

  let total = null;
  db.all('SELECT COUNT(*) as total FROM list', (err, rows) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        error: err.message
      });
    }
    total = rows[0].total;
  });

  db.all(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        error: err.message
      });
    }

    rows.forEach((item) => {
      item.over = item.over === 1 ? true : false;
    });

    res.json({
      code: 1,
      data: rows,
      page: page ? parseInt(page) : 1,
      size: size ? parseInt(size) : 10,
      total
    });
  });
})

// 添加一条todolist
router.post('/add/list', (req, res) => {
  const { content, over, create_time, resolves_time } = req.body;

  // 验证数据是否存在且不为空
  if (!content || !over || !create_time || !resolves_time) {
    return res.status(400).json({
      error: '请填写完整的列表。'
    });
  }

  // 确保 over 是一个有效的布尔值
  let overBool;
  if (over === 'true') {
    overBool = 1;
  } else if (over === 'false') {
    overBool = 0;
  } else {
    return res.status(400).json({
      code: 0,
      error: '无效的值，请使用 true 或 false。'
    });
  }

  if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(create_time) || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(resolves_time)) {
    return res.status(400).json({
      code: 0,
      error: '时间格式不正确，请使用 YYYY-MM-DD HH:mm:ss 格式。'
    });
  }

  // 插入数据到数据库
  db.run('INSERT INTO list (content, over, create_time, resolves_time) VALUES (?, ?, ?, ?)',
    content, overBool, create_time, resolves_time,
    function (err) {
      if (err) {
        return res.status(500).json({
          code: 0,
          error: err.message
        });
      }
      res.status(201).json({
        code: 1,
        message: '成功插入记录',
      });
    }
  );
})

// 删除一条todolist
router.delete('/delete/list/:id', (req, res) => {
  db.run('DELETE FROM list WHERE id = ?', req.params.id, function (err) {
    if (err) {
      return res.status(500).json({
        code: 0,
        error: err.message
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        code: 0,
        error: '未找到记录'
      });
    }

    res.json({
      code: 1,
      message: '成功删除记录'
    });
  });
})

// 修改一条todolist
router.put('/update/list/:id', (req, res) => {
  const { content, over, create_time, resolves_time } = req.body;

  if (!content || !over || !create_time || !resolves_time) {
    return res.status(400).json({
      code: 0,
      error: '请填写完整的列表。'
    });
  }

  let overBool;
  if (over === 'true') {
    overBool = 1;
  } else if (over === 'false') {
    overBool = 0;
  } else {
    return res.status(400).json({
      code: 0,
      error: '无效的值，请使用 true 或 false。'
    });
  }

  if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(create_time) || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(resolves_time)) {
    return res.status(400).json({
      code: 0,
      error: '时间格式不正确，请使用 YYYY-MM-DD HH:mm:ss 格式。'
    });
  }

  // 更新一条todolist
  db.run(
    'UPDATE list SET content = ?, over = ?, create_time = ?, resolves_time = ? WHERE id = ?',
    content, overBool, create_time, resolves_time, req.params.id,
    function (err) {
      if (err) {
        return res.status(500).json({
          code: 0,
          error: err.message
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          code: 0,
          error: '未找到记录'
        });
      }

      res.json({
        code: 1,
        message: '成功更新记录'
      });
    }
  );
})

module.exports = router
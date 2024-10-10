const express = require('express')
const db = require('../db/todolist');

const router = express.Router()

// 获取所有的todolist
router.get('/get/list', (req, res) => {
  db.all('SELECT * FROM list', (err, rows) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        msg: '服务器错误'
      })
    }
    res.json({
      code: 1,
      data: rows
    })
  })
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
    // 如果 over 不是 'true' 或 'false'，则返回错误
    return res.status(400).json({
      code: 0,
      error: '无效的值，请使用 true 或 false。'
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
    res.json({
      code: 1,
      message: '成功删除记录'
    });
  });
})

// 修改一条todolist
router.put('/update/list/:id', (req, res) => {
  const { content, over, create_time, resolves_time } = req.body;

  // 验证数据是否存在且不为空
  if (!content || !over || !create_time || !resolves_time) {
    return res.status(400).json({
      code: 0,
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
    // 如果 over 不是 'true' 或 'false'，则返回错误
    return res.status(400).json({
      code: 0,
      error: '无效的值，请使用 true 或 false。'
    });
  }

  // 更新数据
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
      res.json({
        code: 1,
        message: '成功更新记录'
      });
    }
  );
})

module.exports = router
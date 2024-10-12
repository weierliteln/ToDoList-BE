
# TODOLIST
## 使用说明

1. 打开压缩包解压，在命令行中下载依赖

   ```
   pnpm install
   ```

2. 打开命令行，检查电脑是否安装sqlite3，若没有先安装

   ```
   sqlite3
   ```

3. 下载安装SQLiteStudio或HeidiSQL，导入db目录下的database.db文件，并连接数据库

4. 命令行启动服务

   ```
   nodemon app.js
   ```

​	**如有问题请联系qq:1829305199**

​	**GitHub地址：https://github.com/weierliteln/ToDoList-BE.git**

Base URLs:http://127.0.0.1:3000

## POST 注册

POST /user/register

> Body 请求参数

```yaml
username: ""
password: ""

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |none|
|» password|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 登录

POST /user/login

> Body 请求参数

```yaml
username: ""
password: ""

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |none|
|» password|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取列表

GET /todo/get/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|content|query|string| 否 |none|
|over|query|string| 否 |none|
|page|query|number| 否 |none|
|size|query|number| 否 |none|
|Authorization|header|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "data": [
    {
      "id": 0,
      "content": "string",
      "over": true,
      "create_time": "string",
      "resolves_time": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» data|[object]|true|none||none|
|»» id|integer|true|none||ID 编号|
|»» content|string|true|none||none|
|»» over|boolean|true|none||none|
|»» create_time|string|true|none||none|
|»» resolves_time|string|true|none||none|

## POST 添加一条todoliist

POST /todo/add/list

> Body 请求参数

```yaml
content: ""
over: ""
create_time: 2024-04-04 18:20:21
resolves_time: 2024-04-04 18:20:21

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|
|» content|body|string| 是 |none|
|» over|body|boolean| 是 |none|
|» create_time|body|string| 是 |none|
|» resolves_time|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除一条todolist

DELETE /todo/delete/list/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|number| 是 |none|
|Authorization|header|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 修改一条todolist

PUT /todo/update/list/{id}

> Body 请求参数

```yaml
content: ""
over: ""
create_time: ""
resolves_time: ""

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|number| 是 |none|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|
|» content|body|string| 是 |none|
|» over|body|boolean| 是 |none|
|» create_time|body|string| 是 |none|
|» resolves_time|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|






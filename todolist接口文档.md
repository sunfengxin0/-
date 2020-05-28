- 尝试开启CORS 跨域支持
- 使用coocik验证登录状态
- 数据返回统一使用json

# 1.1 todolist接口

## 1.1. 登录验证接口

- 请求路径：login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| id       | 用户 ID  |      |
| username | 用户名   |      |

- 响应数据

```json
{
    "data": {
        "id": 500,
        "username": "admin",
        role: user.role,
    },
    "meta": {
        "msg": "登录成功",
        "status": 200
    }
}
{
    "data": {
        "id": 500,
        "username": "admin"
    },
    "meta": {
        "msg": "用户名或者密码错误",
        "status": 303
    }
}
```

## 1.2. 注册

- 请求路径：register

- 请求方法：post

- | 参数名   | 参数说明 | 备注     |
  | -------- | -------- | -------- |
  | username | 用户名   | 不能为空 |
  | password | 密码     | 不能为空 |

  响应参数

```
{
    "data": {
        "id": 500,
        "username": "admin"
    },
    "meta": {
        "msg": "注册成功",
        "status": 200
    }
}

{
    "data": {
    },
    "meta": {
        "msg": "注册失败，用户名已存在",
        "status": 300
    }
}
```

## 1.3. 获取待办事项列表

- 请求路径：gettodolist
- 请求方法：get

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户id   | 不能为空 |

响应参数

```
{
    "data": {
       toDoListItems: [{
        	itemid:1231
        	item:"吃饭饭"
        	status:"true"
        }，{
        	itemid:1231
        	item:"打豆豆"
        	status:"false"
        }]
    },
    "meta": {
        "msg": "获取列表成功",
        "status": 200
    }
}

{
    "data": {
    },
    "meta": {
        "msg": "获取待办事项失败",
        "status": 300
    }
}
```

## 1.4. 新增待办事项列表

- 请求路径：newtodolistitem
- 请求方法：put

| 参数名 | 参数说明              | 备注     |
| ------ | --------------------- | -------- |
| uid    | 用户id                | 不能为空 |
| item   | 待办事项名称          | 不能为空 |
| status | 是否完成true or false | 不能为空 |

响应参数

```
{
    "data": {
    	itemid:"1231243234234234"
    },
    "meta": {
        "msg": "新增待办事项成功",
        "status": 200
    }
}

{
    "data": {
    },
    "meta": {
        "msg": "新增待办事项失败",
        "status": 300
    }
}
```

## 1.5. 删除待办事项列表

- 请求路径：deletetodolistitem
- 请求方法：deletet

| 参数名 | 参数说明   | 备注     |
| ------ | ---------- | -------- |
| uid    | 用户id     | 不能为空 |
| itemid | 待办事项id | 不能为空 |

响应参数

```
{
    "data": {
    },
    "meta": {
        "msg": "删除待办事项成功",
        "status": 200
    }
}

{
    "data": {
    },
    "meta": {
        "msg": "删除待办事项失败",
        "status": 300
    }
}
```

## 1.6. 更改待办事项列表

- 请求路径：modifytodolistitem
- 请求方法：put

| 参数名 | 参数说明     | 备注     |
| ------ | ------------ | -------- |
| itemid | 待办事项id   | 不能为空 |
| item   | 事项名称     | 不能为空 |
| status | 状态：布尔值 | 不能为空 |

响应参数

```
{
    "data": {
    },
    "meta": {
        "msg": "修改待办事项成功",
        "status": 200
    }
}

{
    "data": {
    },
    "meta": {
        "msg": "修改待办事项失败",
        "status": 300
    }
}
```


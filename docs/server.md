# 介绍
后台server用koa做内核的方式处理中间件。引用的库有koa-router处理
路由请求。sequelize框架提供orm支持。项目对两个库进行封装，在libs
下。
## 后台项目启动
> node server.js

或者（自动刷新模式）

> nodemon server.js  //需要全局装了nodemon

## settings设置
基础配置可以如下:
```
module.exports = {
    database: {          //数据库配置
        name: 'test',
        username: 'root',
        password: 'root'
    },
    controllerConfig: {    //路由配置
        routers: path.join(__dirname, 'routers', 'index.js')
    },
    PORT: 3001,          //监听端口
    BASE_DIR: __dirname,   //更目录路径(必填)
    MODEL_DIR: '/models'    //model是的路径(默认是models)
};
```

## router路由
路由是server一个常用的功能,server端内置了koa-router作为支持
并且进行了一些封装。在上 **settings设置** 对象里面的**controllerConfig**是用来定义路由的路径
根据该路径像如下定义路由:

```
const Controllers = requireDir('../controllers');

module.exports = {
    'get /users' :  Controllers.user.login,
    'get /': Controllers.home.index,
    'get|post /good': Controllers.user.good
};
```

路由暴露是一个对象，key对应相应的路由路径,值定义调用的方法,也可以是数组。


## controllers
目前controllers健壮性引入，z并没有controller的路径没有对应要求，只是简单模拟
controller的分类而已，只要符合上面的路由规则即可。
不过还是推荐一文件名形式对应分类，便于管理，暴露方法对应路由执行方法，与上面所说一样
可以数组，也可以是方法，如果是数组，除了最后一个执行函数,剩下的方法都要定义next参数
并且在适当时机调用next()执行下一个函数。实现链式路由的调用。ctx参数是一个上下文,
可以参考 [koa文档的context使用](https://github.com/guo-yu/koa-guide)
```
module.exports = {
    login: [
        function (ctx, next) {
            ctx.router = 'login';
            next()
        },
        function (ctx) {
            ctx.body = ctx.router;
        }
    ],
    good (ctx) {
        ctx.body = 'good';
    }
};
```

## model
项目使用sequelize作为orm框架，对orm不是很了解可以了解一下该设计思想，简单
的说就是把数据库的表和代码的类对应起来，本来抽象的数据库语句，现在可以
使用类似
> User.findOne().where({userName: 'wython'})。

 这种方式去查询,并进行封装暴露model。可查看
**settings设置**model路径.

简单的model配置对应如下：
```
const Sequelize = require('sequelize');

module.exports = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null,
        unique: true,
        primaryKey: false,
        field: 'name',
        autoIncrement: false,
        comment: null,
        references: null
    },
    sex: Sequelize.BOOLEAN
};
```

sequelize官方默认给出的数据类型有:
```
Sequelize.STRING                      // VARCHAR(255)
Sequelize.STRING(1234)                // VARCHAR(1234)
Sequelize.STRING.BINARY               // VARCHAR BINARY
Sequelize.TEXT                        // TEXT
Sequelize.TEXT('tiny')                // TINYTEXT

Sequelize.INTEGER                     // INTEGER
Sequelize.BIGINT                      // BIGINT
Sequelize.BIGINT(11)                  // BIGINT(11)

Sequelize.FLOAT                       // FLOAT
Sequelize.FLOAT(11)                   // FLOAT(11)
Sequelize.FLOAT(11, 12)               // FLOAT(11,12)

Sequelize.REAL                        // REAL        PostgreSQL only.
Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.

Sequelize.DOUBLE                      // DOUBLE
Sequelize.DOUBLE(11)                  // DOUBLE(11)
Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)

Sequelize.DECIMAL                     // DECIMAL
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)

Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
Sequelize.DATEONLY                    // DATE without time.
Sequelize.BOOLEAN                     // TINYINT(1)

Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.

Sequelize.JSON                        // JSON column. PostgreSQL only.
Sequelize.JSONB                       // JSONB column. PostgreSQL only.

Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)

Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)

Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.

Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.

Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT')           // Spatial column with geometry type.  PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geometry type and SRID.  PostgreSQL (with PostGIS) or MySQL only.
```

原生的sequelize是这样定义model的:
```
var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model 对应的表名将与model名相同
});
```

可以看出，简单的封装后只是把sequelize.define的第二个参数暴露成容易理解的对象形式。
models文件夹下的文件名对应model的名字。define参数更多细节可以前往:
[sequlize官网](http://docs.sequelizejs.com/)或者部分
[翻译的中文api](https://itbilu.com/nodejs/npm/VkYIaRPz-.html#induction)查看。

**如何拿到model?**
```
let models = require('../libs/model').getModels();

let { User } = models;
```
这样就拿到User了,model query api和sequelize官方接口完全一致。请自由查询。


## server端还有很大的扩展空间。
像更多中间件的引入，项目可以很容易的暴露引入中间件的方式。但是很多功能需要再实践中去学习
还有很大扩展空间，比如session，controller公共模块封装等等。



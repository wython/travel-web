# travel-web
毕业设计的前台页面，项目做了前后端分离，需要后台提供json数据
,旅游旅游网站，基于webpack,react,react-router,redux.

包含前端页面和/admin路由的后端页面

## 启动
运行:npm install安装依赖包

前端启动:
> gulp

或者

> npm run dev

前端构建:
> gulp build

或者

> npm run build



后端启动:

> node server

数据库：
根据server/setting.js 的配置连上数据库

> node manager.js

生成数据库

## 项目细节
后端使用工作时搭建的node服务器,基于koa内核,采用koa-router
做路由转发,sequlize做orm。简单封装model。有很大的修改空间.
[详情点击](https://github.com/turingWu/travel-web/blob/master/docs/server.md)

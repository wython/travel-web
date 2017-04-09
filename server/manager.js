/**
 * Purpose: to create database and table with model。
 * Created by wython on 2017/3/24.
 */
// const Orm = require('./libs/model');
// const settings = require('./setting');
// const path = require('path');
// let database = settings.database;
//
// let orm = Orm.init(database, path.join(settings.BASE_DIR, settings.MODEL_DIR));
//
// orm.defineWithReferences(['Users', 'Followers', 'Blogs', 'Comments', 'Libraries', 'Likes', 'Tips', 'Tips_to_blogs']);
//
// orm._orm.sync({force: true});
const App = require('./libs/app');

const setting = require('./setting');

let app = App(setting);
app.orm.getSequelize().sync({force: true});




// models.Users.sync({force: true}).then(function () {
//    models.Followers.sync({force: true});
// });



var src = './src';
var root = './';
var dist = './dist';


module.exports = {
    debug:true,
    scss:{
        all:{
            'home':[src+'/scss/home/*.scss']
        },
        dist:src+"/css/",
        build:dist+"/css/",
    } ,
    css:{
        all:{
            'home':[src+'/css/home/*.css']
        },
        dist:src+"/css/",
        build:dist+'/css/'
    },
    js:{
        all:src+"/js/**/*.js",
        dist:src+"/js/",
        build:dist+"/js/"
    }
};
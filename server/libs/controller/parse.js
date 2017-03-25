/**
 * Created by wython on 2017/3/22.
 */
module.exports = {
    methods: function(route) {
        let parts = route.split(' ');
        return parts[1] ? parts[0].toLowerCase().split('|') : ['get'];
    },
    path: function(route) {
        let parts = route.split(' ');
        return parts[1] || parts[0] || '/';
    },
};



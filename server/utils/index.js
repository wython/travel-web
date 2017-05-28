/**
 * Created by wython on 2017/4/21.
 */

const uidSafe = require('uid-safe');

module.exports = {
    /**
     * 根据url和对象，生成符合get请求格式的安全url字符串
     * @param url
     * @param object
     * @return {string}
     */
    addUrlParam (url, object) {
        for (let key in object) {
            url += (url.indexOf("?") == -1) ? "?" : "&";
            url += encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
        }
        return url;
    },
    base64Encode(str) {
        return new Buffer(str).toString('base64');
    },
    base64Decode(str) {
        return new Buffer(str).toString();
    },
    /**
     * 根据number创建num位唯一标识
     * @param number
     */
    createUid(number) {
        return new Promise(function (resolve, reject) {
            uidSafe(8, function (err, string) {
                if(err) {
                    reject({ error: true, msg: err })
                } else {
                    resolve(string);
                }
            })
        })
    }
};

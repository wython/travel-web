/**
 * Created by wython on 2017/4/22.
 */

//

/**
 * Reconciles formatted data with already formatted data
 *
 * @param  {Object} obj extractedObject
 * @param  {Object} target the field object
 * @return {Object} reconciled fields
 *
 */
// const reconcile = (obj, target) => {
//     const key = Object.keys(obj)[0];
//     const val = obj[key];
//
//     // The reconciliation works even with array has
//     // Object.keys will yield the array indexes
//     // see https://jsbin.com/hulekomopo/1/
//     // Since array are in form of [ , , valu3] [value1, value2]
//     // the final array will be: [value1, value2, value3] has expected
//     if (target.hasOwnProperty(key)) {
//         return reconcile(val, target[key]);
//     } else {
//         return target[key] = val;
//     }
//
//     // [Deprecated] because of https://jsbin.com/hulekomopo/1/
//     // Dealing with array values
//     // if (Array.isArray(val)) {
//     //   if (Array.isArray(target[key])) {
//     //     target[key] = mergeArray(val, target[key]);
//     //   } else {
//     //     target[key] = val;
//     //   }
//     //   return target;
//     // }
// };

// const objectFromBluePrint = (arr, value) => {
//     return arr
//         .reverse()
//         .reduce((acc, next) => {
//             if (Number(next).toString() === 'NaN') {
//                 return {[next]: acc};
//             } else {
//                 const newAcc = [];
//                 newAcc[ Number(next) ] = acc;
//                 return newAcc;
//             }
//         }, value);
// };
//
// const extractFormData = (string) => {
//     const arr = string.split('[');
//     const first = arr.shift();
//     const res = arr.map( v => v.split(']')[0] );
//     res.unshift(first);
//     return res;
// };
const BusBoy = require('busboy');
const path = require('path');
const fs = require('fs');
const uidSafe = require('uid-safe');
function mult(req, opts, dirname) {
    opts = opts || {};
    opts.headers = req.headers;
    let busBoy = new BusBoy(opts);
    req.pipe(busBoy);
    return new Promise((resolve, reject) => {
        busBoy
            .on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                busBoy.on('file', function (fieldnames, file, filename, encoding, mimetype) {
                    let tmpName = val ? `${new Date().getTime()}_${val}_${filename}` : `${uidSafe(6)}_${filename}`;
                    const saveTo = path.join(dirname, tmpName);
                    //console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
                    const writeStream = fs.createWriteStream(saveTo);
                    writeStream.on('open', () => file
                        .pipe(writeStream)
                        .on('error', reject)
                        .on('finish', () => {
                            resolve({
                                filename,
                                tmpName,
                                saveTo
                            })
                        })
                    );
                })
            })
            .on('finish', function () {
                //console.log('finish');
            })
    });
}
//
// Mult.prototype.files = function (dirname, tmpName) {
//     return new Promise((resolve, reject) => {
//         this.busBoy.on('file', function (fieldname, file, filename, encoding, mimetype) {
//             tmpName = tmpName ? `${new Date().getTime()}_${tmpName}_${filename}` :
//                 `${new Date().getTime()}_ ${fieldname}_${filename}`;
//             const saveTo = path.join(dirname, tmpName);
//             console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
//             const writeStream = fs.createWriteStream(saveTo);
//             writeStream.on('open', () => file
//                 .pipe(writeStream)
//                 .on('error', reject)
//                 .on('finish', () => {
//                     resolve({
//                         filename,
//                         tmpName,
//                         saveTo
//                     })
//                 })
//             );
//         });
//     })
//
// };
//
// Mult.prototype.field = function () {
//     return new Promise((reslove, reject) => {
//         this.busBoy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
//             console.log(`File[${fieldname}]: value: ${val}`);
//             reslove({
//                 [fieldname]: val
//             })
//         })
//     })
//
// };

module.exports = mult;

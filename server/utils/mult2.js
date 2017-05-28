/**
 * Created by wython on 2017/5/26.
 */
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

            })
            .on('finish', function () {
                //console.log('finish');
            })
            .on('file', function (fieldnames, file, filename, encoding, mimetype) {
                uidSafe(6).then((result) => {
                    let tmpName = `${result}_${filename}`;
                    const saveTo = path.join(dirname, tmpName);
                    //console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
                    const writeStream = fs.createWriteStream(saveTo);
                    writeStream
                        .on('open', () => file.pipe(writeStream)
                            .on('error', reject)
                            .on('finish', () => {
                                resolve({
                                    filename,
                                    tmpName,
                                    saveTo
                                })
                            })
                        );
                });
            })
    });
}
module.exports = mult;
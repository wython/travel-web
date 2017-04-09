const Token = require('./token');

module.exports = {
    before() {
        return Token.tokenBeforeRouter
    },
    after(app) {
        return Token.tokenAfterRouter
    }
};


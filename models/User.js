const Sequelize = require('sequelize');
const db = require('./_db');

// 第二個參數是物件，定義有哪些欄位
// gender 依照 IEC 5218 的標準 https://en.wikipedia.org/wiki/ISO/IEC_5218
const User = db.define('User', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    nickname: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.INTEGER
    }
});

module.exports = User;

const Sequelize = require('sequelize');
const db = require('./_db');

const Post = db.define('Post', {
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
});

module.exports = Post;

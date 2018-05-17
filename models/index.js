const db = require('./_db');
const User = require('./User');
const Post = require('./Post');

// 關聯
// 一個 User 可以有多個 Post
User.hasMany(Post, {
    foreignKey: 'authorId'
});

// 每個 Post 屬於一個 User(author)
Post.belongsTo(User, {
    foreignKey: 'authorId'
});

module.exports = {
    db,
    User,
    Post
}

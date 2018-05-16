// NODE_ENV 是常用的環境變數
// 如果不是 production 會載入 dotenv 設定
// dotenv 會去找根目錄底下的 .env 檔案
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Express = require('express');
const helmet = require('helmet');
const serveStatic = require('serve-static');

const { db, User } = require('./models');

const app = Express();
app.use(helmet());
// 當作靜態檔案輸出，如果沒有，再去找其他的 route
// localhost:3000/avatar.jpg
app.use(serveStatic('public'));

// 一定要寫在所有 router 前面
// 會先進到這裡，印出 middleware，接著 next() 找到下一個路徑
app.use((req, res, next) => {
    console.log('middleware');
    next();
})

app.get('/home', function (req, res) { 
    console.log('Hello');
    res.send('Hello Home');
});

app.get('/user/:id', async (req, res) => {
    console.log('params:', req.params);
    console.log('id', req.params.id);
    // User 是類別
    // user 是實例
    const user = await User.findById(req.params.id);
    res.send(user);
});

app.get('/create/user', (req, res) => {
    User.create({
        email: 'newstory0113@gmail.com',
        password: '123456',
        nickname: 'AnnaSu',
        gender: 2,
    }).then(user => {
        res.send(user);
    });
})

app.get('/', function (req, res) {
    console.log('Hello');
    res.send('Hello World');
});

db.sync().then(()=> {
    app.listen(process.env.PORT, function () {
        console.log('start listen http://localhost:3000');
    });
});

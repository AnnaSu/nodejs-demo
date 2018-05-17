// NODE_ENV 是 NodeJS 常用的環境變數
// 如果不是 production 會載入 dotenv 設定
// dotenv 會去找根目錄底下的 .env 檔案
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Express = require('express');
const helmet = require('helmet');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const { db, User, Post } = require('./models');

const app = Express();

app.set('view engine', 'pug');
// parse application/json
app.use(bodyParser.json());
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

app.get('/create/post', async (req, res) => {
    const post = await Post.create({
        title: 'Hello',
        content: 'Hello World 123',
        authorId: 1
    });

    res.send(post);
});

app.get('/', function (req, res) {
    console.log('Hello');
    res.send('Hello World');
});

app.get('/about', function (req, res) {
    res.render('about');
})

app.get('/posts', async (req, res) => {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const posts = await Post.findAndCountAll({
        limit: limit,
        offset: limit * (page - 1)
    });

    res.send(Object.assign(posts, {
        page: page,
        totalPage: Math.ceil(posts.count / limit),
    }));
});

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        res.send(post);
    } else {
        res.status(404).end();
    }
})

app.post('/posts', async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).send(post);
});

app.delete('/posts/:id', async (req, res) => {
    await Post.destroy({
        where: { id: req.params.id }
    });
    res.status(204).end();
});

db.sync().then(()=> {
    app.listen(process.env.PORT, function () {
        console.log('start listen http://localhost:3000');
    });
});

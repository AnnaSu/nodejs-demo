const Express = require('express');
const helmet = require('helmet');
const serveStatic = require('serve-static');

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

app.get('/user/:id', (req, res) => {
    console.log('params:', req.params);
    console.log('id', req.params.id);
    res.send('user id: ' + req.params.id);
});
 
app.get('/', function (req, res) {
    console.log('Hello');
    res.send('Hello World');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('start listen http://localhost:3000');
})

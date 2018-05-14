const Xray = require('x-ray');
const x = Xray();

// https://www.npmjs.com/package/x-ray
// https://kiki.ccu.edu.tw/~ccmisp06/Course/5304.html
// 爬資料: 編號, 科目名稱, 任課教授

x('https://kiki.ccu.edu.tw/~ccmisp06/Course/5304.html', 'table > tr', [{
    no: 'td:nth-child(2)',
    courseName: 'td:nth-child(4)',
    teather: 'td:nth-child(5)',
}]).write('./dist/course.json');

const express = require('express');
const cors = require('cors');
const mysqlDb = require('./mysqlDb');
const news = require('./app/news');
const comments = require('./app/comments');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/news', news);
app.use('/comments', comments);

const run = async () => {

    await mysqlDb.connect();

    app.listen(port, () => {
        console.log(`HTTP life on http://localhost:${port}/`);
    });

    process.on('exit', () => {
        mysqlDb.disconnect();
    })
};

run().catch(e => {
    console.error(e);
});
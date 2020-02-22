const path = require('path');
const express = require('express');
const multer  = require('multer');
const nanoid = require('nanoid');
const mysqlDb = require('../mysqlDb');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const items = await mysqlDb.getConnection().query('SELECT * FROM `news`');
    res.send(items);
});

router.get('/:id', async (req, res) => {
    const item = await mysqlDb.getConnection().query('SELECT * FROM `news` WHERE `id` = ?', req.params.id);
    const itemElement = item[0];
    if (!itemElement) {
        return res.status(404).send({message: 'News Not Found'});
    }
    res.send(itemElement);
});

router.post('/', upload.single('image'), async (req, res) => {
    const news = req.body;

    if (req.file) {
        news.image = req.file.filename;
    }

    if (!news.title || !news.content) {
        return res.status(404).send({message: 'missing title or content of this news'})
    } else {
        await mysqlDb.getConnection().query(
            'INSERT INTO `news` (`title`, `content`, `image`) VALUES ' +
            '(?, ?, ?)',
            [news.title, news.content, news.image]
        );
        res.send('Successful post news');
    }
});

router.delete('/:id', async (req, res) => {
    const item = await mysqlDb.getConnection().query('DELETE FROM `news` WHERE `id` = ?', req.params.id);

    if (item.affectedRows === 0) {
        return res.status(404).send({message: 'No News Found to be deleted'});
    } else {
        res.send('News deleted successfully');
    }
});


module.exports = router;
const express = require('express');
const mysqlDb = require('../mysqlDb');

const router = express.Router();

router.get('/', async (req, res) => {
    if(req.query.news_id){
        const items = await mysqlDb.getConnection().query('SELECT * FROM `comments` WHERE `news_id` = ?', req.query.news_id);
        return res.send(items);
    } else{
        const items = await mysqlDb.getConnection().query('SELECT * FROM `comments`');
        res.send(items);
    }
});

//JSON
router.post('/', async (req, res) => {
    const comment = req.body;

    if (!comment.newsId || !comment.text) {
        return res.status(404).send({message: 'missing text of the comment'})
    } else {
        await mysqlDb.getConnection().query(
            'INSERT INTO `comments` (`news_id`, `author`, `text`) VALUES ' +
            '(?, ?, ?)',
            [comment.newsId, comment.author, comment.text]
        );

        res.send('successful post comment');
    }
});

router.delete('/:id', async (req, res) => {
    const item = await mysqlDb.getConnection().query('DELETE FROM `comments` WHERE `id` = ?', req.params.id);

    if (item.affectedRows === 0) {
        return res.status(404).send({message: 'No Comment Found'});
    } else if (item.affectedRows > 0) {
        res.send('Comment deleted successful');
    }
});


module.exports = router;
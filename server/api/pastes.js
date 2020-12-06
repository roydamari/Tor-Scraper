const { Router, query } = require('express');
const router = Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const update = require('../app');

console.log(update);

router.get('/update', (req, res) => {
    res.send(update);
    update.updated = false;
    update.posts = 0;
})

router.get('/', async (req, res) => {
    const { body } = await client.search({
        from: req.query.offset, size: 10,
        index: 'scraping-data',
    })
    res.send(body.hits.hits.map(paste => paste._source).length > 0 ? body.hits.hits.map(paste => paste._source) : { error: 'No more pastes' });
})

router.get('/:offset', async (req, res) => {
})


module.exports = router;
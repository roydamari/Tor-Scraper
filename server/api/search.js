const { Router } = require('express');
const router = Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

router.get('/', async (req, res) => {
    let { body } = await client.search({
        from: req.query.offset, size: 10,
        index: 'scraping-data',
        body: {
            query: {
                query_string: {
                    query: `*${req.query.search.replace(/ /g, '* *')}*`,
                    fields: ["title", "content", "user", "date"]
                }
            }
        }
    })
    res.send(body.hits.hits.map(paste => paste._source).length > 0 ? body.hits.hits.map(paste => paste._source) : { error: 'No more pastes' });
})


module.exports = router;


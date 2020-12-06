const express = require('express');
const app = express();
app.use(express.json());
const { spawn } = require('child_process');

module.exports = update = { updated: false, posts: 0 }

function Scrape() {
    const pyProg = spawn('python', ['C:/Users/Roy/Documents/GitHub/scraping-dashboard/python-scraper/main.py']);
    pyProg.stdout.on('data', function (data) {
        console.log(data.toString());
        if (Number(data.toString().split(' ')[3]) > 0) {
            update.posts += Number(data.toString().split(' ')[3]);
            update.updated = true;
        }
    });

}

setInterval(Scrape, 120000);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/', require('./api'));

module.exports = app;
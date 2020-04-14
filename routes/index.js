var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/openPipeline', (req, res) => {
    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
		'Access-Control-Allow-Origin': '*',
    });
    res.write('\n');
	
    sseDemo(req, res);
});

function sseDemo(req, res) {
    let messageId = 0;
	let info = req.query.infor;
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	const intervalId = setInterval(() => {
        res.write(`id: ${messageId}\n`);
        messageId += 1;
    }, 1000);
	
    req.on('close', () => {
		clearInterval(intervalId);		
    });
}


module.exports = router;

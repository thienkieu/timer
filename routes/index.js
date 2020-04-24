var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../db');
var trackingConnectionCollection = db.trakingCollection;
var logger = require('../logger');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getLatestDisconenct', (req, res) => {
	const token = req.query.token;
	trackingConnectionCollection().find({userToken: token}, {projection:{connectTime: 1, type: 1, reason: 1}}).sort({connectTime: -1}).limit(1).toArray(function (err, result) {
		if (err) {
			console.error(err);
		}
		
		if (result.length > 0) {
			if (result[0].type === 'connect') {
				return returnCurrentTime(res);
			}

			let reason = result[0].reason;
			if (reason === 'ping timeout') {
				result[0].connectTime =  result[0].connectTime - 15000;
			}

			if (reason === 'client namespace disconnect') {
				result[0].connectTime = result[0].connectTime - 7000;
			}

			return res.json(result);
		}else {
			returnCurrentTime(res);
		}
		
	});
    
});

router.post('/writeLog', (req, res) => {
	res.send();
    logger.info(JSON.stringify(req.body));
});

const returnCurrentTime = function(res) {
	const connectDate = new Date();
		const connectTimestamp = connectDate.getTime();

		return res.json(
			[{"connectTime":connectTimestamp}]
	);
}

module.exports = router;

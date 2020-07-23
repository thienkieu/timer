let connectTrackingCollection = null;
const connectionUrl = 'mongodb://192.168.190.92:27017/onlinetest_tracking'; 
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://192.168.190.92:27017/onlinetest_tracking', {useUnifiedTopology: true})
  .then(client => {
    // ...
    const db = client.db('onlinetest_tracking')
    connectTrackingCollection = db.collection('candidate_connect');
  });

const trackingCollection = function () {
	return connectTrackingCollection;
}

module.exports = {
  trakingCollection: trackingCollection,
  connectionUrl: connectionUrl
}
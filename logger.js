var winston = require('winston');
require('winston-mongodb').Mongo;
require('winston-daily-rotate-file');

var db = require('./db');
var dbConnectionUrl = db.connectionUrl;

var logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: './logs/online-test-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '2m',
      maxFiles: '3d'
    }),
    new winston.transports.MongoDB({
      db: dbConnectionUrl, 
      options: {useUnifiedTopology: true},
      expireAfterSeconds: 10 //259200
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './logs/exceptions.log' })
  ]
});

module.exports = logger;

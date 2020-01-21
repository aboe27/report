require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});

const baseReport = require('./routes/report');

app.use('/v0.0.1/report',baseReport);

app.use(function(req, res, next) {
  next(res.sendStatus('404'));
});


app.set('port', port);
server.listen(port);

console.log(`app listen http://localhost:${port}`);
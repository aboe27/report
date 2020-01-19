const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config();

const server = http.createServer(app);
const port = process.env.PORT;
const bodyParser = require('body-parser');
const router = require('./routes/api');

app.use(express.static(path.join(__dirname, './assets')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

app.use(function(req, res, next) {
  next(res.sendStatus('404'));
});

app.set('port', port);
server.listen(port);

console.log(`app listen http://localhost:${port}`);
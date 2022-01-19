const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// app.use('/images', express.static(`${__dirname}/../uploads`));

app.use('/images', express.static(path
    .join(__dirname, '..', 'uploads')));

app.get('/', (request, response) => response.send());

module.exports = app;

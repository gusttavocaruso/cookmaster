const express = require('express');
const { join } = require('path');

const app = express();
app.use(express.json());
app.use('/images', express.static(join(__dirname, '..', '/uploads')));

app.get('/', (request, response) => response.send());

module.exports = app;

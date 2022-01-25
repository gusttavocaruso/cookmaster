const app = require('./app');
const router = require('./routes/routes');
const middleError = require('./middlewares/error');

app.use(router);
app.use(middleError);

const PORT = 3000;
app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

module.exports = app;

const Express = require('express');
const port = 3000;
const app = new Express();

app.use('/public', Express.static(`${__dirname}/public/`));

app.use((req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info('==> 🌎 Open http://localhost:%s/ on your browser.', port);
    }
});

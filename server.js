const Express = require('express');
const port = 3000;
const app = new Express();

app.use((req, res) => {
    // serve this file for every request
    // ES6 template literals: `The value of someVar is ${someVar}`
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info('==> 🌎 Open http://localhost:%s/ on your browser.', port);
    }
});

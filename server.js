const express = require('express');
const app = express();
const port = 3007;


app.get('/', (req, res) => {
    res.send('server is up !')
});

app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`);
})
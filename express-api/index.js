

const express = require('express');
const helmet = require('helmet')
var path = require('path');

const app = express();

app.use(helmet({
    frameguard: false,
}));

const port = process.env.PORT || 5003;

app.get('/address', (req, res) => {
    res.json({ fName: 'tj', lName:'lj', age: 10, address:'sdsd sdsdsd sdsdsd sdsd'});
});

app.listen(port, () => console.log(`fragment app listening on port ${port}!`));
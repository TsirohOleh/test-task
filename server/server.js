const fields = require('./db/registration-fields.json');

const express = require('express');
const app = express();
const port = 3000;

app.get('/fields', (req, res) => {
  res.send(fields);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

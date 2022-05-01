const fields = require('./db/registration-fields.json');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.get('/fields', (req, res) => {
  res.send(fields);
});

app.post('/register', (req, res) => {
  const body = {...req.body};
  delete body.password;
  res.send(body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

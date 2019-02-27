const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'squirtle';

if (!PORT) {
  throw new Error('PORT not set');
}

if (!ENV) {
  throw new Error('ENV not set');
}

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET not set');
}

const app = express();

app.use(bodyParser.json());

const server = app.listen(PORT, () => {
  console.log(`Server is hot and ready on ${PORT}`);
});
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../database/models/User');

const PORT = process.env.EXPRESS_CONTAINER_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET || 'squirtle';
const REDIS = process.env.REDIS_HOST_PORT;
const REDIS_URL = process.env.REDIS_URL;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    store: new redis({ url: `${REDIS_URL}:${REDIS}`, logErrors: true }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  new User({ id: user.id })
})

if (!PORT) {
  throw new Error('PORT not set');
}

if (!ENV) {
  throw new Error('ENV not set');
}

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET not set');
}

app.listen(PORT, () => {
  console.log(`Server is hot and ready on: ${PORT}`);
});

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local')
const User = require('../database/models/User');
const { auth } = require('./routes')

const PORT = process.env.EXPRESS_CONTAINER_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET || 'squirtle';
const REDIS_HOST_PORT = process.env.REDIS_HOST_PORT;
const REDIS_URL = process.env.REDIS_URL;
const ENV = process.env.NODE_ENV || 'development'

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    store: new redis({ url: `${REDIS_URL}:${REDIS_HOST_PORT}`, logErrors: true }),
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
  console.log('deserializing');
  new User({ id: user.id })
    .fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        username: user.username
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    return new User({ username: username })
      .fetch()
      .then(user => {
        user = user.toJSON();
        if (user === null) {
          return done(null, false, { message: 'bad username or password' });
        } else {
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'bad username or password'
              });
            }
          });
        }
      })
      .catch(err => {
        return done(err)
      });
  })
);

if (!PORT) {
  throw new Error('PORT not set');
}

if (!ENV) {
  throw new Error('ENV not set');
}

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET not set');
}


app.use('/api', auth);

app.listen(PORT, () => {
  console.log(`Server is hot and ready on: ${PORT}`);
});

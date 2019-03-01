const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const User = require('../database/models/User');
const { auth, users, items } = require('./routes');

const PORT = process.env.EXPRESS_CONTAINER_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET || 'squirtle';
const REDIS_HOST_PORT = process.env.REDIS_HOST_PORT;
const REDIS_URL = process.env.REDIS_URL;
const ENV = process.env.NODE_ENV || 'development';

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

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    store: new redis({
      url: `${REDIS_URL}:${REDIS_HOST_PORT}`,
      logErrors: true
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  new User({ id: user.id })
    .fetch()
    .then(user => {
      user = user.toJSON({ visibility: false });
      return done(null, {
        id: user.id,
        username: user.username
      });
    })
    .catch(err => {
      return done(err);
    });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    return User.query(qb => {
      qb.whereRaw(`LOWER(username) LIKE ?`, [username]);
    })
      .fetch()
      .then(user => {
        if (user === null) {
          return done(null, false);
        } else {
          user = user.toJSON({ visibility: false });
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);

app.use('/api', auth, items, users);

app.listen(PORT, () => {
  console.log(`Server is hot and ready on: ${PORT}`);
});

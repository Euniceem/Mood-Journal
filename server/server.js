const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const passport = require('passport');
const bycrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const User = require('../database/models/User');
const {
  auth,
  profile,
  entries,
  emotions,
  activities,
  user_settings,
  data
} = require('./routes');

const PORT = process.env.EXPRESS_HOST_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
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

app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: true }));
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
    email: user.email
  });
});

passport.deserializeUser((user, done) => {
  User.where('id', user.id)
    .fetch()
    .then(user => {
      user = user.toJSON({ visibility: false });
      return done(null, {
        id: user.id,
        email: user.email
      });
    })
    .catch(err => {
      return done(err);
    });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {
      return User.query(qb => {
        qb.whereRaw(`LOWER(email) LIKE ?`, email);
      })
        .fetch()
        .then(user => {
          if (user === null) {
            return done(null, false);
          }

          user = user.toJSON({ visibility: false });
          bycrypt.compare(password, user.password).then(res => {
            if (res) {
              return done(null, user);
            }

            return done(null, false);
          });
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

app.use('/api', auth, profile, entries, emotions, activities, user_settings, data);

app.listen(PORT, () => {
  console.log(`Server is running in PORT: ${PORT}`);
});

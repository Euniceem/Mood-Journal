const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const app = express();

const PORT = process.env.EXPRESS_HOST_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
  session({
    store: new redis({
      url: `${process.env.REDIS_URL}:${process.env.REDIS_HOST_PORT}`,
      logErrors: true
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running in PORT: ${PORT}`);
});

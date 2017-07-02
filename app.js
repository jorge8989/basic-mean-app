const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const config = require('./config/database');
const users = require('./routes/users');

// mongodb
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('connected to db');
})
const db = mongoose.connection;

const app = express();

app.set('port', process.env.PORT || 3010);

// CORS middleware
app.use(cors());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(app.get('port'), (req, res) => {
  console.log(`app running on ${app.get('port')}`);
});

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');
require('./config/passport')(passport);

const port = 3000

const DB_PATH = `mongodb://localhost:27017/sfk-todo`;

mongoose.connect(DB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(function() {
        console.log('Connected to database.');
    })
    .catch(function(err) {
        console.log('Error connecting to database. ', err);
    });

app.use(bodyParser.json({
    limit: '50mb'
}))

const userRoutes = require('./routes/user.routes');
const todoRoutes = require('./routes/todo.routes');

app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);


app.listen(port, () => {
  console.log(`SFK TODO app listening at http://localhost:${port}`)
})
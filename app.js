const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');
require('./config/passport')(passport);

const port = 3000

const DB_PATH = `mongodb://localhost:27017/homeincome`;

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
const expenseRoutes = require('./routes/expense.route');
const categoryRoutes = require('./routes/category.routes');

app.use('/api/user', userRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/category', categoryRoutes);


app.listen(port, () => {
  console.log(`Homeincome API listening at http://localhost:${port}`)
})
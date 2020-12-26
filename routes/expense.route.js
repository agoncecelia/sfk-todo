const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expense.controller');
const passport = require('passport');

const authN = passport.authenticate("jwt", {
  session: false
})

router.post('/', authN, (req, res) => {
  ExpenseController.create(req.user._id, req.body, (err, user) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err
      });
      return;
    }
    res.status(200).json({
      confirmation: true,
      user
    })
  })
});

router.get('/', authN, (req, res) => {
  ExpenseController.find(req.user._id, (err, user) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err
      });
      return;
    }
    console.log('get expense')
    res.status(200).json({
      confirmation: true,
      expenses: user.expenses
    })
  })
})

router.delete('/:id', authN, (req, res) => {
  ExpenseController.delete(req.user._id, req.params.id, (err, user) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err
      });
      return;
    }
    res.status(200).json({
      confirmation: true,
      todos: user.todos
    })
  })
})

router.put('/:id', authN, (req, res) => {
  ExpenseController.update(req.user._id, req.params.id, req.body, (err, user) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err
      });
      return;
    }
    res.status(200).json({
      confirmation: true,
      todos: user.todos
    })
  })
})
module.exports = router;
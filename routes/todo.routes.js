const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todo.controller');
const passport = require('passport');

const authN = passport.authenticate("jwt", {
    session: false
})

router.post('/', authN, (req, res) => {
    TodoController.create(req.user._id, req.body, (err, user) => {
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
    TodoController.find(req.user._id, (err, user) => {
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

router.put('/mark/:id', authN, (req, res) => {
    TodoController.markAsDone(req.user._id, req.params.id, (err, user) => {
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

router.delete('/:id', authN, (req, res) => {
    TodoController.delete(req.user._id, req.params.id, (err, user) => {
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
    TodoController.update(req.user._id, req.params.id, req.body.description, (err, user) => {
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
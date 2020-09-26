const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Create new user
router.post('/signup', (req, res) => {
    UserController.create(req.body, (err, result) => {
        if (err) {
            res.status(500).json({
                confirmation: false,
                message: err.message
            });
            return;
        }

        res.status(201).json({
            confirmation: true,
            data: result
        })
    })
})

// Get one user
router.get('/:id', (req, res) => {
    UserController.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json({
                confirmation: false,
                message: err.message
            });
            return;
        }
        if (!user) {
            res.status(404).json({
                confirmation: false,
                message: 'User not found'
            })
            return;
        }
        res.json({
            confirmation: true,
            user
        })
    })
})

// Get all users
router.get('/', (req, res) => {
    UserController.find({}, (err, users) => {
        if (err) {
            res.status(500).json({
                confirmation: false,
                message: err.message
            });
            return;
        }

        res.status(200).json({
            confirmation: true,
            users
        })
    })
})

// Update user
router.put('/:id', (req, res) => {
    UserController.update(req.params.id, req.body, (err, user) => {
        if (err) {
            res.status(500).json({
                confirmation: false,
                message: err.message
            });
            return;
        }

        res.status(200).json({
            confirmation: true,
            user: user
        })
    })
})

router.delete('/:id', (req, res) => {
    UserController.delete(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json({
                confirmation: false,
                message: err.message
            });
            return;
        }

        res.status(200).json({
            confirmation: true,
            user
        })
    })
})

router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            confirmation: false,
            message: 'Missing email or password as required fields'
        })
    }
    UserController.login(req.body.email, req.body.password, (err, user) => {
        if (err) {
            return res.status(500).json({
                confirmation: false,
                message: err
            })
        }
        res.status(200).json({
            confirmation: true,
            user
        })
    })
})

module.exports = router;
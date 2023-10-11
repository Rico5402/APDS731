const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User signup route
router.post('/signup', (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                return res.status(409).json({
                    message: "Username already exists"
                });
            }

            return bcrypt.hash(req.body.password, 10);
        })
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash
            });

            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: "User created",
                result: result
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "An error occurred",
                error: err
            });
        });
});

// User login route
router.post('/login', (req, res) => {
    let fetchedUser;
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return Promise.reject('Auth failed: User not found');
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return Promise.reject('Auth failed: Incorrect password');
            }

            const token = jwt.sign(
                { username: fetchedUser.username, userId: fetchedUser._id },
                'secret_this_should_be_longer_than_it_is',
                { expiresIn: '1h' }
            );

            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            console.error(err);
            res.status(401).json({
                message: err
            });
        });
});

module.exports = router;


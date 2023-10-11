const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');
const checkAuth = require('../check-auth');

// Retrieve all issues
router.get('/', checkAuth, (req, res) => {
    Issue.find()
        .then((issues) => {
            res.status(200).json({
                message: 'Issues retrieved successfully',
                issues: issues
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to fetch issues',
                error: error
            });
        });
});

// Create a new issue
router.post('/', checkAuth, (req, res) => {
    const issue = new Issue({
        title: req.body.title,
        description: req.body.description,
        datePosted: new Date(),
        department: req.body.department
    });

    issue.save()
        .then(() => {
            res.status(201).json({
                message: 'Issue posted successfully',
                issue: issue
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to post issue',
                error: error
            });
        });
});

// Delete an issue
router.delete('/:id', checkAuth, (req, res) => {
    Issue.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: 'Issue deleted successfully'
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to delete issue',
                error: error
            });
        });
});

module.exports = router;

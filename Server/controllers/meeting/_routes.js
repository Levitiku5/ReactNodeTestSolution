const express = require('express');
const { add, index, view, deleteData, deleteMany } = require('./meeting');

const router = express.Router();

// Create a new meeting
router.post('/add', add);

// Get all meetings
router.get('/', index);

// Get a specific meeting by ID
router.get('/view/:id', view);

// Delete a specific meeting by ID (soft delete)
router.delete('/delete/:id', deleteData);

// Delete multiple meetings by array of IDs
router.post('/deleteMany', deleteMany);

module.exports = router;

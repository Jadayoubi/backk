const express = require('express');
const router = express.Router();
const jobController = require('../../controllers/jobController');

// GET route to fetch job details by ID
router.get('/jobListing/:id', jobController.getJobById);

module.exports = router;

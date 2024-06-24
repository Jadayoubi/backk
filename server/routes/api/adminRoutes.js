const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

// Route to fetch applicants grouped by job title
router.get('/applicants', adminController.getApplicantsByJobTitle);

module.exports = router;

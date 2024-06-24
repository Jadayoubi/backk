const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const verifyToken = require('../../middleware/authMiddleware');
// Route to fetch applicants grouped by job title
router.get('/applicants',verifyToken, adminController.getApplicantsByJobTitle);

module.exports = router;

// routes/api/jobListing.js

const express = require('express');
const router = express.Router();
const jobListingController = require('../../controllers/jobListing');
const verifyToken = require('../../middleware/authMiddleware'); // Adjust the path as per your application

// Apply the middleware to the routes
// router.post('/', verifyToken, jobListingController.createJobListing);
// router.get('/', verifyToken, jobListingController.getAllJobListings);
// router.get('/:id', verifyToken, jobListingController.getJobListingById);
// router.put('/:id', verifyToken, jobListingController.updateJobListing);
// router.delete('/:id', verifyToken, jobListingController.deleteJobListing);
router.post('/',verifyToken, jobListingController.createJobListing);
router.get('/',verifyToken, jobListingController.getAllJobListings);
router.get('/applicants', jobListingController.getApplicantsByJobTitle);
// DELETE a job listing by ID
router.delete('/:id',verifyToken, jobListingController.deleteJobListing);
    
module.exports = router;

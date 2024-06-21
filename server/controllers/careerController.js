
const CareerApplication = require('../models/careerApplications');
const path = require('path');

exports.submitApplication = async (req, res) => {
    const { firstName, lastName, email, phone, jobTitle } = req.body;
    const cvPath = req.file ? req.file.path : null; // Path to the uploaded CV file

    try {
        // Create a new CareerApplication instance
        const newApplication = new CareerApplication({
            firstName,
            lastName,
            email,
            phone,
            cv: cvPath,
            jobTitle,
        });

        // Save the application to the database
        await newApplication.save();

        // Respond with success message
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Failed to submit application. Please try again later.' });
    }
};
exports.getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await JobListing.findById(id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job details:', error);
        res.status(500).json({ error: 'Failed to fetch job details. Please try again later.' });
    }
};
// exports.getAllJobListings = async (req, res) => {
//     try {
//         const jobListings = await jobListing.find();
//         res.json(jobListings);
//     } catch (error) {
//         console.error('Error fetching job listings:', error);
//         res.status(500).json({ error: 'Failed to fetch job listings' });
//     }
// };

// // Delete a job listing by ID
// exports.deleteJobListing = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedJobListing = await JobListing.findByIdAndDelete(id);
//         if (!deletedJobListing) {
//             return res.status(404).json({ error: 'Job listing not found' });
//         }
//         res.json({ message: 'Job listing deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting job listing:', error);
//         res.status(500).json({ error: 'Failed to delete job listing' });
//     }
// };
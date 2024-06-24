// controllers/jobListingController.js

const JobListing = require('../models/jobListing');

// Create a new job listing
exports.createJobListing = async (req, res) => {
    try {
        const newJobListing = await JobListing.create(req.body);
        res.status(201).json(newJobListing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all job listings
exports.getAllJobListings = async (req, res) => {
    try {
        const jobListings = await JobListing.find();
        res.json(jobListings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a job listing by ID
exports.getJobListingById = async (req, res) => {
    try {
        const jobListing = await JobListing.findById(req.params.id);
        if (!jobListing) {
            return res.status(404).json({ error: 'Job listing not found' });
        }
        res.json(jobListing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a job listing
exports.updateJobListing = async (req, res) => {
    try {
        const updatedJobListing = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJobListing) {
            return res.status(404).json({ error: 'Job listing not found' });
        }
        res.json(updatedJobListing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a job listing
exports.deleteJobListing = async (req, res) => {
    try {
        const deletedJobListing = await JobListing.findByIdAndDelete(req.params.id);
        if (!deletedJobListing) {
            return res.status(404).json({ error: 'Job listing not found' });
        }
        res.json({ message: 'Job listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getApplicantsByJobTitle = async (req, res) => {
    try {
        // Aggregate applicants grouped by job title
        const applicants = await CareerApplication.aggregate([
            {
                $group: {
                    _id: "$jobTitle",
                    applicants: {
                        $push: {
                            firstName: "$firstName",
                            lastName: "$lastName",
                            email: "$email",
                            phone: "$phone",
                            cv: "$cv",
                            appliedAt: "$appliedAt"
                        }
                    }
                }
            }
        ]);

        res.status(200).json(applicants);
    } catch (error) {
        console.error('Error fetching applicants:', error);
        res.status(500).json({ error: 'Failed to fetch applicants. Please try again later.' });
    }
};
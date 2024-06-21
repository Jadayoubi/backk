const JobListing = require('../models/jobListing');

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

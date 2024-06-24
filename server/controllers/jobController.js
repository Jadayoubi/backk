const JobListing = require('../models/jobListing');

exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Check if jobId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: 'Invalid job ID format' });
        }

        const job = await JobListing.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job details:', error);
        res.status(500).json({ error: 'Failed to fetch job details. Please try again later.' });
    }
};

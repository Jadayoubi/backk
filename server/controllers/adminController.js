const CareerApplication = require('../models/careerApplications');

exports.getApplicantsByJobTitle = async (req, res) => {
    try {
        // Aggregate applicants by job title
        const applicantsByJobTitle = await CareerApplication.aggregate([
            { $group: { _id: "$jobTitle", applicants: { $push: "$$ROOT" } } }
        ]);

        res.status(200).json(applicantsByJobTitle);
    } catch (error) {
        console.error('Error fetching applicants:', error);
        res.status(500).json({ error: 'Failed to fetch applicants. Please try again later.' });
    }
};

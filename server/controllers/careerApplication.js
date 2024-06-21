const CareerApplication = require('../models/CareerApplication');

exports.submitApplication = async (req, res) => {
    const { firstName, lastName, email, phone, cv, jobTitle } = req.body;

    try {
        // Create a new CareerApplication instance
        const newApplication = new CareerApplication({
            firstName,
            lastName,
            email,
            phone,
            cv,
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

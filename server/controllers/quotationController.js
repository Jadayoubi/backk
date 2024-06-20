const WebQuotation = require('../models/WebQuotation');
// const AppQuotation = require('../models/AppQuotation');
// const FleetQuotation = require('../models/FleetQuotation');

const WebQuotationAdmin = require('../models/WebQuotation'); 
exports.submitWebQuotation = async (req, res) => {
    try {
        const { email, phone, company, type, logo, branding, pages, requirements } = req.body;

        // Validate required fields
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        if (!phone) {
            return res.status(400).json({ message: 'Phone number is required.' });
        }
        if (!company) {
            return res.status(400).json({ message: 'Company name is required.' });
        }
        if (!type) {
            return res.status(400).json({ message: 'Type is required.' });
        }
        if (!logo) {
            return res.status(400).json({ message: 'Logo is required.' });
        }
        if (!pages || typeof pages !== 'number') {
            return res.status(400).json({ message: 'Number of pages must be a valid number.' });
        }
        if (!requirements) {
            return res.status(400).json({ message: 'Requirements are required.' });
        }

        const newQuotation = new WebQuotation({
            email,
             phone,
             company,
            type,
            logo,
            branding,
            pages,
            requirements
        });

        await newQuotation.save();

        res.status(201).json({ message: 'Web quotation received successfully!' });
    } catch (error) {
        console.error('Error submitting web quotation:', error);
        res.status(500).json({ message: 'Failed to submit web quotation. Please try again later.' });
    }
};

exports.getAllQuotations = async (req, res) => {
    try {
        const quotations = await WebQuotationAdmin.find(); // Fetch all quotations from the database
        res.status(200).json(quotations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quotations' });
    }
};
exports.updateQuotationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedQuotation = await WebQuotation.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedQuotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        res.json(updatedQuotation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuotation = await WebQuotation.findByIdAndDelete(id);

        if (!deletedQuotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        res.json({ message: 'Quotation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// exports.submitAppQuotation = async (req, res) => {
//     try {
//         const { email, phone, company, type, features, platform } = req.body;

//         const newQuotation = new AppQuotation({
//             email,
//             phoneNumber: phone,
//             companyName: company,
//             type,
//             features,
//             platform
//         });

//         await newQuotation.save();

//         res.status(201).json({ message: 'App quotation received successfully!' });
//     } catch (error) {
//         console.error('Error submitting app quotation:', error);
//         res.status(500).json({ message: 'Failed to submit app quotation. Please try again later.' });
//     }
// };

// exports.submitFleetQuotation = async (req, res) => {
//     try {
//         const { email, phone, company, type, vehiclesCount, services } = req.body;

//         const newQuotation = new FleetQuotation({
//             email,
//             phoneNumber: phone,
//             companyName: company,
//             type,
//             vehiclesCount,
//             services
//         });

//         await newQuotation.save();

//         res.status(201).json({ message: 'Fleet management quotation received successfully!' });
//     } catch (error) {
//         console.error('Error submitting fleet management quotation:', error);
//         res.status(500).json({ message: 'Failed to submit fleet management quotation. Please try again later.' });
//     }
// };

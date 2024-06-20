// controllers/fleetQuotationController.js
const FleetQuotation = require('../models/FleetQuotation');



exports.submitFleetQuotation = async (req, res) => {
    try {
        const { email, phoneNumber, companyName, type, vehicles, features } = req.body;

        // Validate required fields
        if (!email || !phoneNumber || !companyName || !type || !vehicles || !features) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newQuotation = await FleetQuotation.create({
            email,
            phoneNumber,
            companyName,
            type,
            vehicles,
            features
        });

        res.status(201).json({ message: 'Fleet quotation received successfully!', quotation: newQuotation });
    } catch (error) {
        console.error('Error creating fleet quotation:', error);
        res.status(500).json({ error: 'Failed to create fleet quotation. Please try again later.' });
    }
};


// Get all Fleet Quotations
exports.getAllFleetQuotations = async (req, res) => {
    try {
        const fleetQuotations = await FleetQuotation.find();
        res.json(fleetQuotations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Fleet Quotation status
exports.updateFleetQuotationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedQuotation = await FleetQuotation.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedQuotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        res.json(updatedQuotation);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a specific Fleet Quotation by ID
exports.deleteFleetQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuotation = await FleetQuotation.findByIdAndDelete(id);

        if (!deletedQuotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        res.json({ message: 'Quotation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

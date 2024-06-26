// controllers/appDevQuotationController.js

const AppDevQuotation = require('../models/AppQuotation');

// Create a new quotation
exports.createQuotation = async (req, res) => {
    try {
        const { email, phone, company, appType, platforms, features, designBranding, budgetTimeline } = req.body;
        
        // Validate the required fields
        if (!email || !phone || !company || !appType || !platforms || !features || !designBranding || !budgetTimeline) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create a new quotation
        const newQuotation = new AppDevQuotation({
            email,
            phone,
            company,
            appType,
            platforms,
            features,
            designBranding,
            budgetTimeline
        });

        // Save the quotation to the database
        await newQuotation.save();

        res.status(201).json(newQuotation);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get all quotations
exports.getQuotations = async (req, res) => {
    try {
        const quotations = await AppDevQuotation.find();
        res.status(200).json(quotations);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get a single quotation by ID
exports.getQuotationById = async (req, res) => {
    try {
        const quotation = await AppDevQuotation.findById(req.params.id);

        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found.' });
        }

        res.status(200).json(quotation);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Update a quotation by ID
exports.updateQuotation = async (req, res) => {
    try {
        const { email, phone, company, appType, platforms, features, designBranding, budgetTimeline, status } = req.body;

        const quotation = await AppDevQuotation.findByIdAndUpdate(
            req.params.id,
            { email, phone, company, appType, platforms, features, designBranding, budgetTimeline, status },
            { new: true, runValidators: true }
        );

        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found.' });
        }

        res.status(200).json(quotation);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Delete a quotation by ID
exports.deleteQuotation = async (req, res) => {
    try {
        const quotation = await AppDevQuotation.findByIdAndDelete(req.params.id);

        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found.' });
        }

        res.status(200).json({ message: 'Quotation deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

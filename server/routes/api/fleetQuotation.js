// routes/api/fleetQuotation.js

const express = require('express');
const router = express.Router();
const fleetQuotationController = require('../../controllers/fleetQuotationController');

// Create a new Fleet Quotation
router.post('/', fleetQuotationController.submitFleetQuotation);

// Get all Fleet Quotations
router.get('/', fleetQuotationController.getAllFleetQuotations);

// Update Fleet Quotation status
router.put('/:id', fleetQuotationController.updateFleetQuotationStatus);

// Delete a specific Fleet Quotation by ID
router.delete('/:id', fleetQuotationController.deleteFleetQuotation);

module.exports = router;

const express = require('express');
const router = express.Router();
const fleetQuotationController = require('../../controllers/fleetQuotationController');
const verifyToken = require('../../middleware/authMiddleware'); // Import middleware function

// Apply the middleware to the routes
router.post('/', verifyToken, fleetQuotationController.submitFleetQuotation);
router.get('/', verifyToken, fleetQuotationController.getAllFleetQuotations);
router.put('/:id', verifyToken, fleetQuotationController.updateFleetQuotationStatus);
router.delete('/:id', verifyToken, fleetQuotationController.deleteFleetQuotation);

module.exports = router;

const express = require('express');
const router = express.Router();
const quotationController = require('../../controllers/quotationController');
const  verifyToken  = require('../../middleware/authMiddleware');

// Routes for submitting quotations
router.post('/web', quotationController.submitWebQuotation);

// Routes for retrieving all quotations
router.get('/webQuotations', verifyToken, quotationController.getAllQuotations);

// Routes for updating a quotation by ID
router.put('/webQuotations/:id', verifyToken, quotationController.updateQuotationStatus);

// Routes for deleting a quotation by ID
router.delete('/webQuotations/:id', verifyToken, quotationController.deleteQuotation);

module.exports = router;

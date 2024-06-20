const express = require('express');
const router = express.Router();
const quotationController = require('../../controllers/quotationController')
const {
    submitWebQuotation,
    // submitAppQuotation,
    // submitFleetQuotation
} = require('../../controllers/quotationController');

// Routes for submitting quotations
router.post('/web', submitWebQuotation);
// router.post('/app', submitAppQuotation);
// router.post('/fleet', submitFleetQuotation);
router.get('/webQuotations', quotationController.getAllQuotations);
// routes/api.js

router.put('/webQuotations/:id', quotationController.updateQuotationStatus);

router.delete('/webQuotations/:id', quotationController.deleteQuotation);

module.exports = router;

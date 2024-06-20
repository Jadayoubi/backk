const express = require('express');
const router = express.Router();
const {
    submitWebQuotation,
    // submitAppQuotation,
    // submitFleetQuotation
} = require('../../controllers/quotationController');

// Routes for submitting quotations
router.post('/web', submitWebQuotation);
// router.post('/app', submitAppQuotation);
// router.post('/fleet', submitFleetQuotation);

module.exports = router;

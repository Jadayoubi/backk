// routes/appDevQuotationRoutes.js

const express = require('express');
const router = express.Router();
const appDevQuotationController = require('../../controllers/appDevQuotationController');

router.post('/quotations', appDevQuotationController.createQuotation);
router.get('/quotations', appDevQuotationController.getQuotations);
router.get('/quotations/:id', appDevQuotationController.getQuotationById);
router.put('/quotations/:id', appDevQuotationController.updateQuotation);
router.delete('/quotations/:id', appDevQuotationController.deleteQuotation);

module.exports = router;

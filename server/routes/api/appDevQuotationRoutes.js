// routes/appDevQuotationRoutes.js

const express = require('express');
const router = express.Router();
const appDevQuotationController = require('../../controllers/appDevQuotationController');

router.post('/quotations/app', appDevQuotationController.createQuotation);
router.get('/quotations/app', appDevQuotationController.getQuotations);
router.get('/quotations/app/:id', appDevQuotationController.getQuotationById);
router.put('/quotations/app/:id', appDevQuotationController.updateQuotation);
router.delete('/quotations/app/:id', appDevQuotationController.deleteQuotation);

module.exports = router;

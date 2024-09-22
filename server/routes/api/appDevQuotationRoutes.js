// routes/appDevQuotationRoutes.js

const express = require('express');
const router = express.Router();
const appDevQuotationController = require('../../controllers/appDevQuotationController');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/quotations/app', appDevQuotationController.createQuotation);
router.get('/quotations/app',verifyToken, appDevQuotationController.getQuotations);
router.get('/quotations/app/:id',verifyToken, appDevQuotationController.getQuotationById);
router.put('/quotations/app/:id',verifyToken, appDevQuotationController.updateQuotation);
router.delete('/quotations/app/:id', verifyToken,appDevQuotationController.deleteQuotation);

module.exports = router;

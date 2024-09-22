// routes/appDevQuotationRoutes.js

const express = require('express');
const router = express.Router();
const consultingQuotationController = require('../../controllers/consultingQuotationController');
const verifyToken = require('../../middleware/authMiddleware');
router.post('/create', consultingQuotationController.createQuotation);
router.get('/get',verifyToken, consultingQuotationController.getQuotations);
router.get('/getbyid/:id',verifyToken, consultingQuotationController.getQuotationById);
router.put('/update/:id',verifyToken, consultingQuotationController.updateQuotation);
router.delete('/delete/:id',verifyToken, consultingQuotationController.deleteQuotation);

module.exports = router;

const express = require('express');
const router = express.Router();
const quotationController = require('../../controllers/quotationController');
const verifyToken = require('../../middleware/authMiddleware');

// Log each request to this router
router.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Routes for web quotations
router.get('/webQuotations', verifyToken, quotationController.getAllQuotations);
router.post('/web', quotationController.submitWebQuotation);
router.put('/webQuotations/:id', verifyToken, quotationController.updateQuotationStatus);
router.delete('/webQuotations/:id', verifyToken, quotationController.deleteQuotation);

module.exports = router;

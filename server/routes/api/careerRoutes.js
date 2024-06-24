const express = require('express');
const router = express.Router();
const careerController = require('../../controllers/careerController');
const multer = require('multer');
const path = require('path');

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads')); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// File filter for multer
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept PDF files
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

// Initialize multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

// POST route to handle career application submission
router.post('/apply', upload.single('cv'), careerController.submitApplication);
// router.get('/jobListing/:id', careerController.getJobById);
module.exports = router;

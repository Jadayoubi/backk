// models/WebQuotation.js
const mongoose = require('mongoose');

const webQuotationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    // Add other fields specific to web quotation
    type: {
        type: String,
        required: true
    },
    logo: String,
    branding: String,
    pages: Number,
    requirements: String,
    // Add additional fields specific to web quotation
});

const WebQuotation = mongoose.model('WebQuotation', webQuotationSchema);

module.exports = WebQuotation;

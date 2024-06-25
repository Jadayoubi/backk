// models/AppDevQuotation.js

const mongoose = require('mongoose');

const appDevQuotationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    appType: {
        type: String,
        required: true
    },
    platforms: {
        type: [String],
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    designBranding: {
        type: String,
        required: true
    },
    budgetTimeline: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AppDevQuotation = mongoose.model('AppDevQuotation', appDevQuotationSchema);

module.exports = AppDevQuotation;

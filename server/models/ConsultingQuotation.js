// models/AppDevQuotation.js

const mongoose = require('mongoose');

const consultingQuotationSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true
    },
    challenges: {
        type: [String],
        required: true
    },
    support: {
        type: [String],
        required: true
    },
    team: {
        type: String,
        required: true
    },
    timeline: {
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

const ConsultingQuotation = mongoose.model('ConsultingQuotation', consultingQuotationSchema);

module.exports = ConsultingQuotation;

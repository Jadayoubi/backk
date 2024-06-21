// models/FleetQuotation.js
const mongoose = require('mongoose');

const fleetQuotationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    vehicles: {
        type: String,
        required: true
    },
    features: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        default: 'pending'
    }
});

const FleetQuotation = mongoose.model('FleetQuotation', fleetQuotationSchema);

module.exports = FleetQuotation;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for career application
const careerApplicationSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cv: { type: String, 
        //required: true 
    }, // Example assuming CV is stored as a string (e.g., file path or URL)
    jobTitle: { type: String, required: true }, // Added jobTitle field
    appliedAt: { type: Date, default: Date.now } // Optional: Timestamp when application was submitted
});

// Create model from schema
const CareerApplication = mongoose.model('CareerApplication', careerApplicationSchema);

module.exports = CareerApplication;

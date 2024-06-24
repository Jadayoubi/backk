const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobListingSchema = new Schema({
    jobTitle: { type: String, required: true },
    department: { type: String },
    location: { type: String },
    description: { type: String },
    requirements: { type: String },
    responsibilities: { type: String },
    skills: { type: [String] },
    experience: { type: String },
    employmentType: { type: String },
    salary: { type: Number },
    benefits: { type: String },
    // Add more fields as needed
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;

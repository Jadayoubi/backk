// models/WebQuotation.js

const mongoose = require('mongoose');

const webQuotationSchema = new mongoose.Schema({
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
        required:true
    },
    type: {
        type: String,
        required: true
    },
    logo:{
        type:String,
        required:true
    }, 
  
    pages:{
        type: Number,
        required:true
    } ,
    requirements:{
        type:String,
        required:true
    }, 
    status: {
        type: String,
        default: 'Pending'
    }
});

const WebQuotation = mongoose.model('WebQuotation', webQuotationSchema);

module.exports = WebQuotation;

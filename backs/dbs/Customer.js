const mongoose = require('mongoose');

const custSchema = new mongoose.Schema({
    name: String,
    contact: Number,
    address: String,
    email: String,
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

const Customer = mongoose.model('Customer', custSchema);

module.exports = Customer;
const mongoose = require('mongoose');

const messSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    unit: Number,
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

const Item = mongoose.model('Item', messSchema);

module.exports = Item;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        oldPrice: {
            type: Number,
            required: false,
            default: 0,
            min: 0,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        image: {
            type: String,
            default: null,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);
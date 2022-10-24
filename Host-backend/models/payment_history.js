const mongoose = require("mongoose");

const PaymentHistory = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    payment_id: {
        type: String,

        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    payment_method: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    default: {
        type: Boolean,
        title: "Default",
    },
});

const payment_history = mongoose.model("payment_histories", PaymentHistory);
module.exports = { payment_history };

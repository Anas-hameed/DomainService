const mongoose = require("mongoose");

const PaymentInformationSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    credit_card: {

        cardNumber: {
            type: String,
            maxLength: 40,
            minLength: 1,
            required: true,
        },
        expiration_month: {
            type: String,
            maxLength: 2,

            required: true,
        },
        expiration_year: {
            type: Number,
            maxLength: 2,
            required: true,
        },
        cvc: {
            type: Number,
            maxLength: 3,
            required: true,
        },
        paypal_account: {

        },
    },


    default: {
        type: Boolean,
        title: "Default",
    },
});

const PaymentInfo = mongoose.model("payment_informations", PaymentInformationSchema);
module.exports = { PaymentInfo };

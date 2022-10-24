const mongoose = require('mongoose')


const AddressSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        maxLength: 150,
        minLength: 1,
        required: true,
    },
    lastName: {
        type: String,
        maxLength: 150,
        null: true,
    },
    phone_number: {
        type: Number,
        title: "Phone number",
        maxLength: 15,
        minLength: 1,
        required: false,
    },
    address_1: {
        type: String,
        title: "Address Line 1",
        maxLength: 150,
        minLength: 1,
        required: true,
    },
    address_2: {
        type: String,
        title: "Address Line 2",
        maxLength: 150,
        null: false
    },
    country: {
        type: String,
        title: "Country",
        maxLength: 150,
        minLength: 1,
        required: true,
    },
    state: {
        type: String,
        title: "State",
        maxLength: 150,
        null: true,
    },
    city: {
        type: String,
        title: "City",
        maxLength: 150,
        minLength: 1,
        required: true,
    },
    postal_code: {
        type: String,
        title: "Zip code",
        maxLength: 7,
        required: true,
    },
    default: {
        type: Boolean,
        title: "Default"
    }


})

const address = mongoose.model("Address", AddressSchema)
module.exports = { address, AddressSchema }

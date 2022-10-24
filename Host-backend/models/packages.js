const mongoose = require("mongoose");

const PackagesSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        maxLength: 150,
        minLength: 1,
        required: true,
    },
    image: {
        type: String,
        maxLength: 500,
        minLength: 1,
        required: true,
    },
    package: [
        {
            name: String,
            desc: String,
            is_free: Boolean,
            is_pro: Boolean,
            free: String,
            pro: String
        },
    ],
    default: {
        type: Boolean,
        title: "Default",
    },
});

const packages = mongoose.model("Packages", PackagesSchema);
module.exports = { packages };

const mongoose = require("mongoose");

const UsagePackagesSchema = mongoose.Schema({
    data_transfer: {
        type: String,
        required: true,
    },

    include: {
        type: String,

    },
    price: {
        type: Number,

    },
    price_estimate: {
        type: Number,

    },

});

const UsagePackages = mongoose.model("usage_packages", UsagePackagesSchema);
module.exports = { UsagePackages };

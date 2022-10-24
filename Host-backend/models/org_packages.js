const mongoose = require("mongoose");

const OrgPackagesSchema = mongoose.Schema({

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
            is_team: Boolean,
            is_enterprise: Boolean,
            enterprise: String,
            free: String,
            team: String
        },
    ],
    default: {
        type: Boolean,
        title: "Default",
    },
});

const org_packages = mongoose.model("org_packages", OrgPackagesSchema);
module.exports = { org_packages };

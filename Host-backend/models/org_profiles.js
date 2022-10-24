const mongoose = require("mongoose");

const OrgProfile = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        maxLength: 150,

    },
    email: {
        type: String,
        maxLength: 150,

    },
    logo: {
        type: String,

    },
    description: {
        type: String,
        maxLength: 500,


    },
    url: {
        type: String,
        maxLength: 100,

    },
    twitter_username: {
        type: String,
        maxLength: 100,

    },
    location: {
        type: String,
        maxLength: 100,
    },
    billing_email: {
        type: String,
        maxLength: 100,

    },
    gravatar_email: {
        type: String,
        maxLength: 100,
    },
    sponsors_email: {
        type: String,
        maxLength: 100,
    },

});

const orgprofile = mongoose.model("org_profiles", OrgProfile);
module.exports = { orgprofile };

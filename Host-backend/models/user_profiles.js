const mongoose = require("mongoose");

const UserProfile = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    bio: {
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
    company: {
        type: String,
        maxLength: 100,

    },
    location: {
        type: String,
        maxLength: 250,


    },
    logo: {
        type: String,

    },


});

const userprofile = mongoose.model("user_profiles", UserProfile);
module.exports = { userprofile };

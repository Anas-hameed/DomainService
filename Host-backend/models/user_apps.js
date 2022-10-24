const mongoose = require("mongoose");

const UserAppsSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    app_slug: {
        type: String,
        maxLength: 150,
        minLength: 1,
        required: true,
    },
    address_id: {
        type: String,
        required: true,
    },
    package_id: {
        type: String,
        required: true,
    },
    is_payment: {
        type: Boolean,
        required: true,
    },
    free_trial: {
        type: Boolean,
        required: true,
    },


    default: {
        type: Boolean,
        title: "Default",
    },
});

const UserApps = mongoose.model("user_apps", UserAppsSchema);
module.exports = { UserApps };

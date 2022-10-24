const mongoose = require("mongoose");

const UsageActionsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    include: {
        type: String,

    },
    price: {
        type: String,

    },

});

const UsageActions = mongoose.model("usage_actions", UsageActionsSchema);
module.exports = { UsageActions };

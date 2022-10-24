const mongoose = require('mongoose')


// create a tldPriority schema with unique index on tld without _id
const tldPrioritySchema = mongoose.Schema({
    tld :{
        type:String,
        required: true,
        index: {
            unique: true
        }
    },
    priority : {
        type: Number,
        required: true,
    },
},{autoIndex: true});


const tldPriorityModel = mongoose.model("tldPriority", tldPrioritySchema)
module.exports = tldPriorityModel

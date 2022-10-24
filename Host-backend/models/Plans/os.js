const mongoose = require('mongoose')


const OSSchema = new mongoose.Schema({
        version :{
            type: String,
            immutable :true
        },
        title: {
            type: String,
            maxLength : 250,
            minLength : 1,
            required : true
        },
        description: {
            type: String,
            minLength : 1,
            required : true
        },
        
        logo: {
            type: String,
            maxLength : 500,
            minLength : 1,
            required : true
        },
        price : Number
      

    }
);

const OS =  mongoose.model("OS", OSSchema);
module.export = { OS }
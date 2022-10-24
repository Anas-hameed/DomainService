const mongoose = require('mongoose')


const priceSchema = mongoose.Schema({
    tldName :{
        type:String,
        required: true,
    },
    duration : {
        type: Number,
        required: true,
    },
    ActionType:{
        type:String,
        required: true,
        maxLength: 20
    },
    Price : {
        type: Number,
        required: true,
    },
    AdditionalCost : {
        type: Number,
    },
    RegularPrice:{
        type: Number,
        required: true,
    },
    RegularAdditionalCost:{
        type: Number,
    },
    EffectivePrice:{
        type: Number,
    },
    EffectiveAdditionalCost:{
        type: Number,
    },
    PromotionPrice:{
        type: Number,
    },
    Currency:{
        type: String,
    },
    priority : {
        type: Number,
        required: true,
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    },
    UpdatedAt:{
        type: Date,
        default: Date.now
    },
});

priceSchema.index({
    tldName: 1,
    duration: 1,
    ActionType:1,
  }, {
    unique: true,
  });




const priceModel = mongoose.model("Tldprice", priceSchema)
module.exports = priceModel

const periorityJson    = require('../../domain/tldpriority.json');
const allPrice =require('../../domain/allprice.json');
const tldPriorityModel = require('../../models/Domain/tldModel');
const priceModel       = require('../../models/Domain/priceModel');
const CustomError      = require('../../utils/customErrorHandler');
const {validationResult} = require('express-validator');

// get the tlds Periority
const gettldPeriority = async (req, res, next) => {

    const tldPriority = await tldPriorityModel.find();
    if (!tldPriority) {
        return next(tldPriority);
    }
    res.status(200).json(tldPriority);
}

// get periority by id
const gettldPeriorityById = async (req, res, next) => {
    const { tldId } = req.params;
    const tldPriority = await tldPriorityModel.findById(tldId);
    if (!tldPriority) {
        return next(new CustomError(404, `No tld Periority with the id of ${tldId}`, tldPeriorityData));
    }
    res.status(200).json(tldPriority);
}


// add tld periority
const addtldPeriority = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new CustomError(400, "Schema Validation Error", errors));
    }
    const tldPeriorityData = await tldPriorityModel.create(req.body);
    if (!tldPeriorityData) {
        return next(new CustomError(404, `No tld Periority with the id of ${tldId}`, tldPeriorityData));
    }
    res.status(201).json(tldPeriorityData);
}

// update tld periority
const updatetldPeriority = async (req, res, next) => {
    const { tldId } = req.params;
    const tldPeriorityData = await tldPriorityModel.findByIdAndUpdate(tldId, req.body, { new: true });
    if (!tldPeriorityData) {
        return next(new CustomError(404, `Update fails,No tld Periority with the id of ${tldId}`, tldPeriorityData));
    }
    const tldPriceData = await priceModel.updateMany({tldName:tldPeriorityData.tld}, {priority:tldPeriorityData.priority});
    res.status(201).json(tldPeriorityData);
}

// delete tld periority
const deletetldPeriority = async (req, res, next) => {
    const { tldId } = req.params;
    const tldPeriorityData = await tldPriorityModel.findByIdAndDelete(tldId);
    if (!tldPeriorityData) {
        return next(new CustomError(404, `Delete fails,No tld Periority with the id of ${tldId}`, tldPeriorityData));
    }
    res.status(201).json("Delete was successful");
}

// load the tld periority dataset
const loadtldPeriority = async (req, res, next) => {
    const tldPeriorityData = await tldPriorityModel.find();
    if(tldPeriorityData?.length <500){
        const keys = Object.keys(periorityJson);
        for(let i=0; i<keys.length; i++){
            const perioritytlist= [];
            for(let j=0; j<periorityJson[keys[i]].length; j++){
                perioritytlist.push( {tld:periorityJson[keys[i]][j],priority:i}); 
            }
            try{
                const tldPeriorityData = await tldPriorityModel.insertMany(perioritytlist, {ordered:false});
                if(!tldPeriorityData){
                    return next(new CustomError(404,"fails to insert the data", tldPeriorityData));
                }
            }catch(err){
                if(err?.message.includes("duplicate key error")){
                    // ignore the duplicate key error
                }else{
                    return next(new CustomError(404,"fails to insert the data", err));
                }
            }
        }
    }


    // Get all the periority from the tldPriorityModel
    const tldPerioritylist = await tldPriorityModel.find();
    if(!tldPerioritylist){
        return next(new CustomError(404,"fails to get the data", tldPerioritylist));
    }
    // Make a object with key value pair for periority and tld
    const tldPeriorityObj = {};
    for(let i=0; i<tldPerioritylist.length; i++){
        tldPeriorityObj[tldPerioritylist[i].tld]=tldPerioritylist[i].priority;
    }

    // load data for the json file
    const division = 100;
    let size= allPrice.length;
    let size1=parseInt(size/division);
    let size2=size-(size1*division);
    for(let i=0; i<size1; i++){
        const priceList = [];
        for(let j=0; j<division; j++){
            const { name,action,duration,price,additional_cost,regular_price,regular_additional_cost,effective_price,effective_additonal_cost,promotion_price,currency}= allPrice[(i*division)+j];
            priceList.push({tldName:name ,duration:duration ,ActionType:action,Price:price ,AdditionalCost:additional_cost ,RegularPrice:regular_price,RegularAdditionalCost:regular_additional_cost,EffectivePrice:effective_price,EffectiveAdditionalCost:effective_additonal_cost,PromotionPrice:promotion_price,Currency:currency,priority:tldPeriorityObj[name]});         
        }
        try{
            const priceData = await priceModel.insertMany(priceList, {ordered:false});
            if(!priceData){
                return next(new CustomError(404,"fails to insert the data", priceData));
            }
        }catch(err){
            if(err?.message.includes("duplicate key error")){
            }
            else{
                return next(new CustomError(404,"fails to insert the data", err));
            }
        }
    }
    const priceList = [];
    for(let i=0; i<size2; i++){
        const { name,action,duration,price,additional_cost,regular_price,regular_additional_cost,effective_price,effective_additonal_cost,promotion_price,currency}= allPrice[(size1*division)+i];
        priceList.push({tldName:name ,duration:duration ,ActionType:action,Price:price ,AdditionalCost:additional_cost ,RegularPrice:regular_price,RegularAdditionalCost:regular_additional_cost,EffectivePrice:effective_price,EffectiveAdditionalCost:effective_additonal_cost,PromotionPrice:promotion_price,Currency:currency,priority:tldPeriorityObj[name]});
    }

    // insert the data into the priceModel
    try{
        const priceData = await priceModel.insertMany(priceList, {ordered:false});
        if(!priceData){
            return next(new CustomError(404,"fails to insert the data", priceData));
        }
    }catch(err){
        if(err?.message.includes("duplicate key error")){
            // ignore the duplicate key error message
        }
        else{
            return next(new CustomError(404,"fails to insert the data", err));
        }
    }
    res.status(201).json("Load was successful");
}


module.exports = { gettldPeriority, gettldPeriorityById, addtldPeriority, updatetldPeriority, deletetldPeriority, loadtldPeriority };
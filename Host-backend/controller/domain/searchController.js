const { validationResult } = require("express-validator");
const CustomError = require('../../utils/customErrorHandler');
const namecheap= require('../../utils/nameCheapConfig');
const priceModel = require('../../models/Domain/priceModel');
const resolveResponse= require('../../utils/promisefyResult');
const TldModel= require('../../models/Domain/tldModel');


// Route for searching for avaliablity of the domain
const searchTld= async(req,res, next)=>{
    const ActionTypes= [ "REACTIVATE","TRANSFER","REGISTER","RENEW"];
    const {priority , duration, domain,ActionType} = req.query;
    if(!priority || !duration || !domain || !ActionType){
        return next(new CustomError(400,'Please provide all the required fields'));
    }

    if(!ActionTypes.includes(ActionType)){
        return next(new CustomError(400, "Invalid ActionType, Expected: REACTIVATE, TRANSFER, REGISTER, RENEW"));
    }
    const domainName = domain.split(".");
    const tldArr= [domain];
    const tldPeriorty= await TldModel.find({priority});
    tldPeriorty.forEach((tld)=>{
        tldArr.push(domainName[0]+"."+tld.tld);
    })

    // check the avaliablity of the domain
    let data= await resolveResponse(tldArr,namecheap.domains.check);
    if(!data || !data?.DomainCheckResult){
        return next(new CustomError(500, "Error in searching the domain",data));
    }
    data= data.DomainCheckResult;
    const result= [];
    for(let i=0; i<data.length; i++){
        let domainSplit=data[i]._attributes?.Domain.split(".");
        if(!domainSplit){
            continue;
        }
        let res3;
        if(domainSplit.length>2){
            let str= `${domainSplit[domainSplit.length-2]}.${domainSplit[domainSplit.length-1]}`;
            res3= await priceModel.findOne({tldName:str,duration, ActionType});
        }else{
            res3= await priceModel.findOne({tldName:domainSplit[domainSplit.length-1],duration, ActionType});
        }
        if(!res3){
            continue;
        }else{
            const {_id,duration,DurationType,Price,AdditionalCost,RegularPrice,RegularAdditionalCost,EffectivePrice,EffectiveAdditionalCost,PromotionPrice,currency}= res3;
            result.push({_id,duration,DurationType,Price,AdditionalCost,RegularPrice,RegularAdditionalCost,Domain:data[i]._attributes?.Domain, Available:data[i]._attributes.Available,IsPremiumName:data[i]._attributes.IsPremiumName,EffectivePrice ,EffectiveAdditionalCost,PromotionPrice, currency });
        }
        
    }
    return res.status(200).json(result);

}

module.exports= {searchTld};
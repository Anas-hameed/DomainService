const CustomError = require('../../utils/customErrorHandler');
const priceModel = require('../../models/Domain/priceModel');
const tldPeriorityModel= require('../../models/Domain/tldModel');
const resolveResponse= require('../../utils/promisefyResult');
const namecheap= require('../../utils/nameCheapConfig');

// get all the tld prices
const gettldPrice = async (req, res, next) => {
    let tlddetaillist= [];
    if(req?.query?.priority){
        tlddetaillist= await priceModel.find({priority: req.query.priority});   
    }else{
        tlddetaillist= await priceModel.find();
    }
    if(!tlddetaillist){
        return next(new CustomError(500, 'Internal Server Error',tlddetaillist));
    }
    res.status(200).json(tlddetaillist);
}


// get the price of a single tld
const getTldPricebyId = async (req, res, next) => {
    const {tldId}= req.params;
    const tlddetails= await priceModel.findById(tldId);
    if(!tlddetails){
        return next(new CustomError(200, 'No record with this tid'));
    }
    return res.json(tlddetails);
}

// create a new tld price
const createTldPrice = async (req, res, next) => {
    let tld=[];
    const ActionName= [ "REACTIVATE","TRANSFER","REGISTER","RENEW" ];
    // check for already existance
    if(req?.body?.priority!=null){
        tld= await priceModel.find({priority: req.body.priority});
        if(tld.length>0){
            return next(new CustomError(500, 'Data for tldPricing already Exist'));
        }
    }

    if(req?.body?.priority!=null){
        tld= await tldPeriorityModel.find({priority: req.body.priority});
    }else{
        tld= await tldPeriorityModel.find();
    }
    if(!Array.isArray(tld)){
        tld=[tld];
    }
    for(let k=0; k<tld.length; k++){
        let res3=[];
        let check=true;
        let timetodelay= 5;
        for(let i=0; i< ActionName.length; i++){
            let res1=[], err1=null;
            do{
                try{
                    res1= await resolveResponse({ DOMAIN: 'DOMAIN',ActionName:ActionName[i], ProductName:tld[k].tld}, namecheap.users.getPricing);
                    err1=null;
                }
                catch(err){
                    err1=[];
                    if(err?.code==="500000"){
                        await new Promise(resolve => setTimeout(resolve, timetodelay*1000));
                    }else{
                        return next(new CustomError(500, 'Result1 Server Error', err));
                    }
                }
            }while(err1!=null);

            if(!res1){
                return next(new CustomError(500, 'Result1 Server Error', res1));
            }
            if(!res1?.UserGetPricingResult){
                return next(new CustomError(500, 'Error in fetching records'));
            }
            let val= res1.UserGetPricingResult?.ProductType?.ProductCategory?.Product?.Price;
            if(!val){
                continue;
            }else{
                check= false;
            }
            // If val is of type Object not array(Incase 1-record is parse)
            if(!(Array.isArray(val))){
                val= [val];
            }
            for(let j=0; j< val.length  ; j++){
            const {Duration,DurationType,Price,PricingType,AdditionalCost,
                RegularPrice,RegularPriceType,RegularAdditionalCost,RegularAdditionalCostType,
                YourPrice,YourPriceType,YourAdditonalCost,YourAdditonalCostType,
                PromotionPrice,Currency}= val[j]._attributes;
                // More item can be added here if wanted, Respective schema need to be updated for getting it back
                res3.push({tldName:tld[k].tld,duration:Duration,ActionType:ActionName[i],DurationType,Price ,AdditionalCost,RegularPrice,RegularAdditionalCost,EffectivePrice:YourPrice,EffectiveAdditionalCost:YourAdditonalCost,  priority: tld[k].priority, PromotionPrice, Currency});
            }  
        }
        if(check){
            // Incase the tld does not exist, delete the record from db and go ahead
            const tldNotExitRemoval= await tldPeriorityModel.findOneAndDelete({tld:tld[k].tld});
            if(!tldNotExitRemoval){
                return next(new CustomError(500, 'fails in removing tld record'));
            }
        }
        // Insert data to mongoose
        const res4= await priceModel.insertMany(res3);
        if(!res4){
            return next(new CustomError(500, "Failed to pupulate database at that time, try again later",res4));
        }
    }
    res.status(201).json("Data inserted successfully");
}


// update the tLd price 
const updateTldPrice = async (req, res, next) => {
    let tld=[];
    const ActionName= [ "REACTIVATE","TRANSFER","REGISTER","RENEW" ];
    if(req?.body?.priority!=null){
        tld= await tldPeriorityModel.find({priority: req.body.priority});
    }else{
        tld= await tldPeriorityModel.find();
    }
    if(!Array.isArray(tld)){
        tld=[tld];
    }
    for(let k=0; k<tld.length; k++){
        let res3=[];
        let check=true;
        let timetodelay= 5;
        for(let i=0; i< ActionName.length; i++){
            let res1=[], err1=null;
            do{
                try{
                    res1= await resolveResponse({ DOMAIN: 'DOMAIN',ActionName:ActionName[i], ProductName:tld[k].tld}, namecheap.users.getPricing);
                    err1=null;
                }
                catch(err){
                    err1=[];
                    if(err?.code==="500000"){
                        await new Promise(resolve => setTimeout(resolve, timetodelay*1000));
                    }else{
                        return next(new CustomError(500, 'Result1 Server Error',err));
                    }
                }
            }while(err1!=null);

            if(!res1){
                return next(new CustomError(500, 'Result1 Server Error', res1));
            }
            if(!res1?.UserGetPricingResult){
                return next(new CustomError(500, 'Error in fetchinjg records'));
            }
            let val= res1.UserGetPricingResult?.ProductType?.ProductCategory?.Product?.Price;
            if(!val){
                continue;
            }else{
                check= false;
            }
            // If val is of type Object not array(Incase 1-record is parse)
            if(!Array.isArray(val)){
                val= [val];
            }
            for(let j=0; j< val.length  ; j++){
            const {Duration,DurationType,Price,PricingType,AdditionalCost,
                RegularPrice,RegularPriceType,RegularAdditionalCost,RegularAdditionalCostType,
                YourPrice,YourPriceType,YourAdditonalCost,YourAdditonalCostType,
                PromotionPrice,Currency}= val[j]._attributes;
                //    More item can be added here if wanted, Respective schema need to be updated for getting it back
                if(Duration && DurationType && Price && RegularPrice){
                    res3.push({tldName:tld[k].tld,duration:Duration,ActionType:ActionName[i],DurationType,Price ,AdditionalCost,RegularPrice,RegularAdditionalCost,EffectivePrice:YourPrice,EffectiveAdditionalCost:YourAdditonalCost,  priority: tld[k].priority, PromotionPrice, Currency});
                }
            }  
        }
        if(check){
            // Incase the tld does not exist, delete the record from db and go ahead
            const tldNotExitRemoval= await tldPeriorityModel.findOneAndDelete({tld:tld[k].tld});
            if(!tldNotExitRemoval){
                return next(new CustomError(500, 'fails in removing tld record'));
            }
        }

        for(let i=0; i< res3.length; i++){
            const res4= await priceModel.updateOne({tldName:res3[i].tldName, duration:res3[i].duration, ActionType:res3[i].ActionType}, {...res3[i],UpdatedAt:new Date()}, {new:true});
            // Insert data to mongoose 
            if(!res4){
                return next(500, "Failed to update database at that time, try again later");
            }
        }
    }
    res.status(200).json("Update Sucessfully");
}

// update the tLd price 
const deleteTldPrice = async (req, res, next) => {
    let deleteRecord;
    if(req?.body?.priority!=null){
        deleteRecord= await priceModel.deleteMany({priority: req.body.priority});
    }else{
        deleteRecord = await priceModel.deleteMany({});

    }
    res.status(200).json(deleteRecord);
}

module.exports = {gettldPrice,createTldPrice,getTldPricebyId,updateTldPrice,  deleteTldPrice};

const {validationResult} = require('express-validator');
const CustomError= require('../../utils/customErrorHandler');
const resolveResponse= require('../../utils/promisefyResult');
const namecheap= require('../../utils/nameCheapConfig');

const registerDomain= async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new CustomError(400, "Input validation failed",errors));
    }
    const {DomainName,...rest}= req.body;
    // const res1= await resolveResponse(DomainName,namecheap.domains.create,rest);

    res.status(200).json("Sucessfully registered");
}

module.exports ={registerDomain};
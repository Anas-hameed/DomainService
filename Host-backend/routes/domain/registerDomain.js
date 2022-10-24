
const express   = require('express');
const router    = express.Router();
const asycWrapper   = require('../../middleware/asyncWrapper');
const {registerDomainSchema}= require('../../middleware/validator/registerDomainValidator');
const {registerDomain}= require('../../controller/domain/registerDomainController');

// there are routes for the teams
router.post('/',  registerDomainSchema,asycWrapper(registerDomain));



module.exports ={router};
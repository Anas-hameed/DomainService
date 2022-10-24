const express= require('express');
const router    = express.Router();
const asycWrapper   = require('../../middleware/asyncWrapper');
const {searchTld} = require('../../controller/domain/searchController');
const {searchDomainScehma} = require('../../middleware/validator/searchValidator');


router.get('/',searchDomainScehma,  asycWrapper(searchTld));
module.exports = {router};

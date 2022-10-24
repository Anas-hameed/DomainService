
const express   = require('express');
const router    = express.Router();
const asycWrapper   = require('../../middleware/asyncWrapper');
// const keycloak  = require('../../middleware/keycloakAuth').getKeycloak();
const {gettldPrice,createTldPrice,getTldPricebyId,deleteTldPrice,updateTldPrice}= require('../../controller/domain/priceController');
const keycloak  = require('../../middleware/keycloakAuth').getKeycloak();


// there are routes for the teams
router.get('/'       ,  keycloak.protect('admin'),  asycWrapper(gettldPrice));
router.get('/:tldId' ,  keycloak.protect('admin'),  asycWrapper(getTldPricebyId));
router.post('/'      ,  keycloak.protect('admin'),  asycWrapper(createTldPrice));
router.put('/'     ,  keycloak.protect('admin'),  asycWrapper(updateTldPrice));
router.delete('/'    ,  keycloak.protect('admin'),  asycWrapper(deleteTldPrice));


module.exports= {router};
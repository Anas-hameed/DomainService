
const express   = require('express');
const router    = express.Router();
const asycWrapper   = require('../../middleware/asyncWrapper');
const keycloak  = require('../../middleware/keycloakAuth').getKeycloak();
const { gettldPeriority, gettldPeriorityById, addtldPeriority, updatetldPeriority, deletetldPeriority, loadtldPeriority}= require('../../controller/domain/tldPriorityController');
const {tldPeriorityScehma}= require('../../middleware/validator/tldPeriorityValidator');

// there are routes for the teams
router.get('/' ,        keycloak.protect('admin'), asycWrapper(gettldPeriority));
router.get('/:tldId',   keycloak.protect('admin'), asycWrapper(gettldPeriorityById));
router.post('/',        keycloak.protect('admin'), tldPeriorityScehma,asycWrapper(addtldPeriority));
router.patch('/:tldId' ,keycloak.protect('admin'), asycWrapper(updatetldPeriority));
router.delete('/:tldId',keycloak.protect('admin'), asycWrapper(deletetldPeriority));

// load the dataset to the database
// you can use this route only once to load the dataset to the database for mongodb 
router.post('/loadData',    asycWrapper(loadtldPeriority));
module.exports= {router};
const express = require('express')
const { createApp, getAppList, getAppById, getPackageById } = require('../controller/marketplaces')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()
const verifyUser = require("../middleware/keycloakAuth").verifyUser

const router = express.Router()


router.get('/packageId', verifyUser, keycloak.protect("user"), getPackageById);
router.get('/', getAppList);
router.get('/:id', getAppById);



router.post('/', verifyUser, keycloak.protect("admin"), createApp);
// router.put('/:id',  keycloak.protect("admin"), updatePackageById );
// router.delete('/:id',  keycloak.protect("admin"), deletePackageById);


module.exports = { router }

const express = require('express')
const { createPackages, getPackages } = require('../controller/usage_packages')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()

const router = express.Router()



router.get('/', keycloak.protect("user"), getPackages);
// router.get('/:id', getPackageById);
router.post('/', keycloak.protect("admin"), createPackages);
// router.put('/:id',  keycloak.protect("admin"), updatePackageById );
// router.delete('/:id',  keycloak.protect("admin"), deletePackageById);


module.exports = { router }

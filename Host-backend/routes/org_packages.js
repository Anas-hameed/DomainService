const express = require('express')
const { createOrgPackages, getOrgPackagesList } = require('../controller/org_packages')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()

const router = express.Router()



router.get('/', keycloak.protect("user"), getOrgPackagesList);
// router.get('/:id', getPackageById);
router.post('/', keycloak.protect("admin"), createOrgPackages);
// router.put('/:id',  keycloak.protect("admin"), updatePackageById );
// router.delete('/:id',  keycloak.protect("admin"), deletePackageById);


module.exports = { router }

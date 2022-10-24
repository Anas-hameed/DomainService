const express = require('express')
const { getOrgInfo, createOrUpdateOrgInfo } = require('../controller/org_profiles')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()

const router = express.Router()



router.get('/', keycloak.protect("user"), getOrgInfo);

router.post('/', keycloak.protect("user"), createOrUpdateOrgInfo);




module.exports = { router }

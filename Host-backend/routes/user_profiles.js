const express = require('express')
const { getUserInfo, createOrUpdateUserInfo } = require('../controller/user_profiles')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()

const router = express.Router()



router.get('/', keycloak.protect("user"), getUserInfo);

router.post('/', keycloak.protect("user"), createOrUpdateUserInfo);




module.exports = { router }

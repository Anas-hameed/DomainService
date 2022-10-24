const express = require('express')
const { createApp, getAppById, updateAppById } = require('../controller/user_apps')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()

const router = express.Router()


//router.get('/', getAppList);
router.get('/', keycloak.protect("user"), getAppById);
router.post('/', keycloak.protect("user"), createApp)
router.put('/:id', keycloak.protect("admin"), updateAppById)
// router.delete('/:id', keycloak.protect("admin"), deleteAppById)



module.exports = { router }

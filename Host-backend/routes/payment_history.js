const express = require('express')
const { createPaymentHistory, getPaymentHistory } = require('../controller/payment_history')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()

const router = express.Router()


router.get('/', keycloak.protect("user"), getPaymentHistory)
// why? this doesn't make any sense! 
// router.post('/', keycloak.protect("user"), createPaymentHistory)





module.exports = { router }

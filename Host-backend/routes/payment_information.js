const express = require('express')
const { createPaymentInfo, getPaymentInfo, updatePaymentInfo } = require('../controller/payment_information')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()

const router = express.Router()



router.get('/',         keycloak.protect("user"), getPaymentInfo);
router.post('/',        keycloak.protect("user"), createPaymentInfo);
// router.get('/:id',      keycloak.protect("user"), getPaymentInfoById);
router.put('/:id',      keycloak.protect("user"), updatePaymentInfo);
// router.delete('/:id',   keycloak.protect("user"), deletePaymentInfoById);




module.exports = { router }

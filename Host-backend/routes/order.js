const express = require('express')
const {getOrderList, getOrderById, createOrder }   = require('../controller/order')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()

const router = express.Router()


// router.get('/admin',     keycloak.protect("admin"),  getOrderList );
router.get('/',     keycloak.protect("user"),   getOrderList );
router.post('/',    keycloak.protect("user"),   createOrder  );
router.get('/:id',  keycloak.protect("user"),   getOrderById );



module.exports =  { router }

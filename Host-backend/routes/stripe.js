const express = require("express")
const Stripe = require("stripe")
const { createCheckoutSession, createToken } = require("../controller/stripe")
const keycloak = require('../middleware/keycloakAuth').getKeycloak()


const stripe = Stripe(process.env.STRIPE_KEY)
 
const router = express.Router()

router.post('/create-checkout-session', keycloak.protect("user"), createCheckoutSession);
router.post('/create-token', keycloak.protect("user"),  createToken)



module.exports =  { router }

const express =require('express')
const { getOSPlans } = require('../../controller/plans/os')

const router = express.Router()


router.get('/',  getOSPlans)



module.exports = { router }
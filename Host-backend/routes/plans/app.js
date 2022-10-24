const express =require('express')
const { getAppPlans } = require('../../controller/plans/app')

const router = express.Router()

router.get('/', getAppPlans)



module.exports = { router }
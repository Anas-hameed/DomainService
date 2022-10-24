const { body } = require('express-validator');

const searchDomainScehma = [
    body('domain').exists({ checkFalsy: true }).withMessage("domain name is required").bail().isLength({ max: 100 }).withMessage("Maximum length of domain is 100"),
    body('duration').exists({checkFalsy:true}).withMessage("duration of registration is required"),
    body('priority').exists().withMessage("priority of domain is required"),
    body('ActionType').exists().withMessage("ActionType is required")
]

module.exports = { searchDomainScehma };
const { body } = require('express-validator');

const tldPeriorityScehma = [
    body('tld').exists({ checkFalsy: true }).withMessage("tld value is required"),
    body('priority').exists({checkFalsy:true}).withMessage("Periority is required"),
]

module.exports = { tldPeriorityScehma };
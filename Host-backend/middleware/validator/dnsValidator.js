const { body } = require('express-validator');

const setdnsHostSchema= [
    body('domainName').exists().withMessage("domainName is required").bail().isLength({ min: 1, max:255 }).withMessage("length should be in range 1-255"),
    body('RecordType').exists().withMessage("RecordType is required"),
    body('HostName').exists().withMessage("HostName is required").bail().isLength({ min: 1, max:255 }).withMessage("length should be in range 1-255"),
    body('Address').exists().withMessage("Address is required").bail().isLength({ min: 1, max:255 }).withMessage("length should be in range 1-255"),
    body('MXpref').exists().withMessage("MXpref is required").bail().isInt({ min: 1, max:255 }).withMessage("length should be in range 1-255"),
    body('TTL').exists().withMessage("TTL is required").bail().isInt({ min: 60, max:60000 }).withMessage("TTL should be in range 60-60000"),
]
    




module.exports = {  setdnsHostSchema };
const {body}= require('express-validator');


const registerDomainSchema = [
    body('DomainName').notEmpty().withMessage('DomainName is required'),
    body('Years').notEmpty().withMessage('Years is required').bail().isNumeric().withMessage('Years must be a number'),
    body('RegistrantFirstName').notEmpty().withMessage('RegistrantFirstName is required'),
    body('RegistrantLastName').notEmpty().withMessage('RegistrantLastName is required'),
    body('RegistrantAddress1').notEmpty().withMessage('RegistrantAddress1 is required'),
    body('RegistrantCity').notEmpty().withMessage('RegistrantCity is required'),
    body('RegistrantStateProvince').notEmpty().withMessage('RegistrantStateProvince is required'),
    body('RegistrantPostalCode').notEmpty().withMessage('RegistrantPostalCode is required'),
    body('RegistrantCountry').notEmpty().withMessage('RegistrantCountry is required'),
    body('RegistrantPhone').notEmpty().withMessage('RegistrantPhone is required'),
    body('RegistrantEmailAddress').notEmpty().withMessage('RegistrantEmailAddress is required').bail().isEmail().withMessage('Registrant email address is not valid'),
    body('TechFirstName').notEmpty().withMessage('TechFirstName is required'),
    body('TechLastName').notEmpty().withMessage('TechLastName is required'),
    body('TechAddress1').notEmpty().withMessage('TechAddress1 is required'),
    body('TechCity').notEmpty().withMessage('TechCity is required'),
    body('TechStateProvince').notEmpty().withMessage('TechStateProvince is required'),
    body('TechPostalCode').notEmpty().withMessage('TechPostalCode is required'),
    body('TechCountry').notEmpty().withMessage('TechCountry is required'),
    body('TechPhone').notEmpty().withMessage('TechPhone is required'),
    body('TechEmailAddress').notEmpty().withMessage('TechEmailAddress is required').bail().isEmail().withMessage('Tech email address is not valid'),
    body('AdminFirstName').notEmpty().withMessage('AdminFirstName is required'),
    body('AdminLastName').notEmpty().withMessage('AdminLastName is required'),
    body('AdminAddress1').notEmpty().withMessage('AdminAddress1 is required'),
    body('AdminCity').notEmpty().withMessage('AdminCity is required'),
    body('AdminStateProvince').notEmpty().withMessage('AdminStateProvince is required'),
    body('AdminPostalCode').notEmpty().withMessage('AdminPostalCode is required'),
    body('AdminCountry').notEmpty().withMessage('AdminCountry is required'),
    body('AdminPhone').notEmpty().withMessage('AdminPhone is required'),
    body('AdminEmailAddress').notEmpty().withMessage('AdminEmailAddress is required').bail().isEmail().withMessage('Admin email address is not valid'),
    body('AuxBillingFirstName').notEmpty().withMessage('AuxBillingFirstName is required'),
    body('AuxBillingLastName').notEmpty().withMessage('AuxBillingLastName is required'),
    body('AuxBillingAddress1').notEmpty().withMessage('AuxBillingAddress1 is required'),
    body('AuxBillingCity').notEmpty().withMessage('AuxBillingCity is required'),
    body('AuxBillingStateProvince').notEmpty().withMessage('AuxBillingStateProvince is required'),
    body('BillingPostalCode').notEmpty().withMessage('BillingPostalCode is required'),
    body('AuxBillingCountry').notEmpty().withMessage('AuxBillingCountry is required'),
    body('AuxBillingPhone').notEmpty().withMessage('AuxBillingPhone is required'),
    body('AuxBillingEmailAddress').notEmpty().withMessage('AuxBillingEmailAddress is required').bail().isEmail().withMessage('AuxBilling email address is not valid')   
]

module.exports = {registerDomainSchema};
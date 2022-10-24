const express= require('express');
const router = express.Router();
const asycWrapper = require('../../middleware/asyncWrapper');
// const keycloak = require('../middleware/keycloakAuth').getKeycloak();
const {dns_get_host,dns_post_host,dns_update_host, delete_dns_host}= require('../../controller/domain/dnsController');
const {getdnsHostSchema, setdnsHostSchema}= require('../../middleware/validator/dnsValidator');


router.get('/' ,  asycWrapper(dns_get_host));
router.post('/'  , setdnsHostSchema, asycWrapper(dns_post_host));
router.patch('/:HostId' , asycWrapper(dns_update_host));
router.delete('/:HostId' , asycWrapper(delete_dns_host));





module.exports= {router};
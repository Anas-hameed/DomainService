const express =require('express')
const keycloak = require('../middleware/keycloakAuth').getKeycloak()
const { getAddressList, 
    createAddress, 
    getAddressById, 
    updateAddressById, 
    getMyAddress,
    deleteAddressById } = require("../controller/address.js")

const router = express.Router( )

router.get('/dummy', (req, res)=>{
    console.log(req)
    res.json("HelloWorld")
})



// address 
// return address list if "admin", can query all address
router.get('/',       keycloak.protect("admin"),    getAddressList      );
// router.get('/admin/:user_id', keycloak.protect("admin"),    getAddressListByUserId      );
router.get('/personal', keycloak.protect("user"),     getMyAddress  );
router.post('/',      keycloak.protect("user"),     createAddress       );
router.get('/:addressId',    keycloak.protect("user"),     getAddressById      );
router.put('/:addressId',    keycloak.protect("user"),     updateAddressById   );
router.delete('/:addressId', keycloak.protect("user"),     deleteAddressById   );


module.exports = {router}
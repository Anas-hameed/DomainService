import Keycloak from "keycloak-connect";
import session from "express-session";


let _keycloak ;


var keycloakConfig = {
    clientId: 'next-node',
    bearerOnly: true,
    serverUrl:'https://auth.disdicilo.it/auth/',
    realm: 'deploy',
    credentials: {
        secret: 'a94721c9-5ebd-4b59-8a52-676bdf61bc09'
    }

}


export const initKeycloak = ( handler ) =>{
  return async (req, res) =>{
    if (_keycloak) {
      console.warn("Trying to init Keycloak again!");
      req.keycloak = _keycloak;
  } 
  else {
      console.log("Initializing Keycloak...");
      var memoryStore = new session.MemoryStore();
      _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
      console.log(_keycloak)
     req.keycloak = _keycloak;
  }
       return handler(req, res);
}
}
    


 export const getKeycloak = ( handler ) =>{
  return async (req, res) =>{
  if (!_keycloak){
    console.error('Keycloak has not been initialized. Please called init first.');
     } 
      req.keycloak = _keycloak;
       return handler(req, res);
    }

  }
      


 
    
   

     
      

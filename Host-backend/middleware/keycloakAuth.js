var session = require('express-session');
var Keycloak = require('keycloak-connect');
const express = require('express')
const redis = require('redis')
const connectRedis = require('connect-redis')
 require('dotenv').config()

const app = express()

let _keycloak;

var keycloakConfig = {
    clientId: process.env.AUTH_CLIENT_ID,
    bearerOnly: true,
    serverUrl: process.env.AUTH_URL,
    realm: process.env.AUTH_REALM,
    credentials: {
        secret: process.env.AUTH_CLIENT_SECRET
    }
};

const RedisStore = connectRedis(session)
//configure redis client
const  redisClient = redis.createClient({
    socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
}

}
)
redisClient.on('error',  function(err){
    console.log("couldn't establish a connection")
})
redisClient.on('connect',  function(err){
    console.log("connected to redis successfully")
})
 function initKeycloak() {
    redisClient.connect()
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        console.log(_keycloak)
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        
        app.use(session({
            secret: 'mysecret',
            resave: false,
            saveUninitialized: true,
            store: new RedisStore({
                client:redisClient
            })
          }));
        _keycloak = new Keycloak({ store: RedisStore }, keycloakConfig);
      
        return _keycloak;
    }
}

function getKeycloak() {

    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

const verifyUser =(req, res, next)=>{
    
    if(req.headers){
        const userID =req.kauth.grant.access_token.content.sub
       req.userId = userID
    }else{
        console.log("no user found")
    }
    next()
}

module.exports = {
    initKeycloak,
    getKeycloak,
    verifyUser
};

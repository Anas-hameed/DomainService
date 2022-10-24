const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const keycloak = require("./middleware/keycloakAuth").initKeycloak()
const verifyUser = require("./middleware/keycloakAuth").verifyUser
const addressRoutes = require('./routes/address')
const orderRoutes = require('./routes/order')
const stripeRoutes = require('./routes/stripe')
const appRoutes = require('./routes/plans/app')
const osRoutes = require('./routes/plans/os')
const packages = require('./routes/packages')
const paymentHistory = require('./routes/payment_history')
const payment_information = require('./routes/payment_information')
const user_apps = require('./routes/user_apps')
const marketplaces = require('./routes/marketplaces')
const user_profile = require('./routes/user_profiles')
const org_profile = require('./routes/org_profiles')
const org_package = require('./routes/org_packages')
const usage_package = require('./routes/usage_packages')
const usage_action = require('./routes/usage_actions')


var session = require('express-session');

const tldPrice = require('./routes/domain/price');
const domainSearch = require('./routes/domain/search');
const tldPriority = require('./routes/domain/tldPriority');
const dnsRecord = require('./routes/domain/dns');

const errorMiddleware = require('./middleware/errorMiddleware');
const CustomError = require('./utils/customErrorHandler');

require('dotenv').config()

const app = express()

// attached the body header with the request
app.use(express.json());
app.use(cors({
    origin: "*"
}))
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,

}))

// app.use("/api/search", domainSearch.router);
app.use(keycloak.middleware());
// app.use(verifyUser);



app.use("/api/address", verifyUser, addressRoutes.router)
app.use('/api/order', verifyUser, orderRoutes.router)
app.use('/api/stripe', verifyUser, stripeRoutes.router)
app.use("/api/app", verifyUser, appRoutes.router)
app.use("/api/os", verifyUser, osRoutes.router)
app.use("/api/packages", verifyUser, packages.router)
app.use("/api/payment_history", verifyUser, paymentHistory.router)
app.use("/api/user_apps", verifyUser, user_apps.router)
app.use("/api/tld_price", verifyUser, tldPrice.router);
app.use("/api/search", domainSearch.router);
app.use("/api/payment_information", verifyUser, payment_information.router);
app.use("/api/tld_periority", verifyUser, tldPriority.router);
app.use("/api/dns_record", verifyUser, dnsRecord.router);
app.use("/api/marketplaces", marketplaces.router);
app.use("/api/user_profile", verifyUser, user_profile.router);
app.use("/api/org_profile", verifyUser, org_profile.router);
app.use("/api/org_package", verifyUser, org_package.router);
app.use("/api/usage_package", verifyUser, usage_package.router);
app.use("/api/usage_action", verifyUser, usage_action.router);

// 404 Error
app.all("*", (req, res, next) => {
    return next(new CustomError(404, "Routes Not found"));
});


app.use(errorMiddleware);

//db config
const mongoURL = process.env.MONGODB_URL
console.log(mongoURL)


const port = process.env.PORT || 4000;


mongoose.connect(mongoURL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => {
        console.log(`listening at port ${port}`)
    })
}).catch((err) => {
    console.log(err.message + "000")
})

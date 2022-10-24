## Authentication  

For authentication, a SSO server managing users, clients (front-end and back-end) and resources is used to connect the app to others. 
The SSO server is configure in keycloak config.

Both front-end and back-end use a bearer token to protect user access, permissions and roles. 

For testing the endpoints you can retrieve the user bearer token from [here](https://next-keycloak.vercel.app)

Once authenticated with an user you will be redirected to this utility

![image](https://user-images.githubusercontent.com/94698774/193740726-c1ea988a-17fe-45d6-8dc0-0cf200d7fec6.png)

the last element in the page is a valid bearer you can use with postman to test the user.
Decoding the token with any utility (for instance [jwt.io](https://jwt.io)) will give useful insight on the user, its own permission and roles.



## Error Logging
The purpose of error logging is to make sure a error log of every improper request is recorded in the server log directory. To record a log, there is just a small code change required to be done in the route and controller file. Let's walk through the working example by implementing a get request on tldPricing. 
So in the tldPricing route, we have the following code. 

### Route
```
const asycWrapper   = require('../../middleware/asyncWrapper');
router.get('/', asycWrapper(gettldPrice));
```
<p><strong>Note::</strong>The purpose of asyncWrapper is to avoid typing try and catch in every request. The asyncWrapper function deals with the errors in a single place. It has nothing to do with error logging. You can always use try/catch again and again in different routes. But, it is always a good practice to enclose an entire controller function in a try/catch instead of enclosing a small portion of the controller to make sure that the server never breaks, if there is an issue in one of the requests. The issue can occur for any reason in the controller on one route and the entire code can break. With the asyncWrapper, it is guaranteed that the server will never break, and every error is recorded in the log for later reference </p>

### Controller
Here is the code of the controller.
```
const CustomError = require('../../utils/customErrorHandler');

const gettldPrice = async (req, res, next) => {
    let tlddetaillist= await priceModel.find();
    }
    if(!tlddetaillist){
        return next(new CustomError(500, 'Internal Server Error',tlddetaillist));
    }
    res.status(200).json(tlddetaillist);
}
```
As you can see, we can accept the third argument next in the request and simply return next with a CustomError object as a parameter as next(new CustomError(StatusCode, Message, ErrorObject)). You can also return next(err object) in case you don't know the cause. It will give a 500 status code with an error message of "Internal server error" in that case.  That is all, the error will be automatically recorded in the logs folders in the server directory. 

<p><strong>Note::</strong> You must return next. Simple passing the error to next doesn't stop the request from excution </p>

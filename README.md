azure-jwt-verify
=================================

[![npm version](https://badge.fury.io/js/azure-jwt-verify.svg)](https://badge.fury.io/js/azure-jwt-verify)
[![license](https://img.shields.io/npm/l/serverless-dynamodb-local.svg)](https://www.npmjs.com/package/serverless-dynamodb-local)

## This Plugin Requires
* NodeJS Runtime

## Features
* Verify JWT Token issued by Azure Active Directory B2C
* Automatically use the rotated public key from Azure Public Keys URL

## Install Plugin
`npm install --save azure-jwt-verify`
 
## Using Azure JWT Verify in your code
You need to define the following constants based on your Azure Active Directory B2C application configurations

### Initialize module
```javascript
var azureJWT = requre('azure-jwt-verify');

```

### Configuration and the JWT to verify
```javascript
var jwtToken = "YOUR_JWT_TOKEN_TO_VERIFY"; // You can find this url in Azure Active Directory B2C Section
const config = {
    JWK_URI: "",
    ISS: "",
    AUD: ""
};
```
* JWK_URI and the ISS(Issuer) can be obtained from the metadata endpoint of the policies created in the B2C tenant.
* AUD(Audience) is the Client ID of the application accessing the tenant.

### Verify Function
```javascript
azureJWT.verify(jwtToken, config).then(function(decoded){
// success callback

}, function(error){
// error callback

})
```

## Response Examples

#### For valid and authorize JWT token.

Response body:
```
{
   "status": "success",
   "message": {
      "exp": 1486111778,
      "nbf": 1486108178,
      "ver": "1.0",
      "iss": "https://login.microsoftonline.com/9434db1e-33cd-4607-b350-9d947127a5de/v2.0/",
      "sub": "ff8490cb-2bda-4cc8-b801-4a22a8620c59",
      "aud": "dfc54797-efe3-4db3-a1e1-422b4ecf27d7",
      "nonce": "defaultNonce",
      "iat": 1486108178,
      "auth_time": 1486108178,
      "oid": "ff8490cb-2bda-4cc8-b801-4a22a8620c59",
      "name": "jon snow",
      "extension_NIC": "933132325V",
      "emails": [
         "hellodishan@gmail.com"
      ],
      "tfp": "B2C_1_b2c_1_sign_in"
   }
}
```

#### For valid but expired JWT token.

Response body:
```
{
   "status": "error",
   "message": {
      "name": "TokenExpiredError",
      "message": "jwt expired",
      "expiredAt": "2017-02-02T12:30:11.000Z"
   }
}
```

#### For invalid JWT token.

Response body:
```
{
   "status": "error",
   "message": "Error Decoding JWT Token"
}
```




## Links
* [Azure Active Directory B2C](https://azure.microsoft.com/en-us/services/active-directory-b2c/)
* [Contact Us](mailto:ashanf@99x.lk)
* [NPM Registry](https://www.npmjs.com/package/azure-jwt-verify)

## License
  [MIT](LICENSE)

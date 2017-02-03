azure-jwt-verify
=================================

[![npm version](https://badge.fury.io/js/azure-jwt-verify.svg)](https://www.npmjs.com/package/azure-jwt-verify)
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

###Initialize module
```javascript
var azureJWT = requre('azure-jwt-verify');

```

###Configuration and the JWT to verify
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

###Verify Function
```javascript
azureJWT.verify(jwtToken, config).then(function(decoded){
// success callback

}, function(error){
// error callback

})
```

## Links
* [Azure Active Directory B2C](https://azure.microsoft.com/en-us/services/active-directory-b2c/)
* [Contact Us](mailto:ashanf@99x.lk)
* [NPM Registry](https://www.npmjs.com/package/azure-jwt-verify)

## License
  [MIT](LICENSE)

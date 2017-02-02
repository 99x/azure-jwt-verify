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

```
const AZURE_PUBLIC_KEYS_URL= ""

var azureJWt = requre('azure-jwt-verify');

azureJWT.verify('YOUR-JWT-TOKEN').then(function(decoded){
// success callback

}, function(error){
// error callback

})
```
Verifying the jwt token

## Links
* [Azure Active Directory B2C](https://azure.microsoft.com/en-us/services/active-directory-b2c/)
* [Contact Us](mailto:ashanf@99x.lk)
* [NPM Registry](https://www.npmjs.com/package/azure-jwt-verify)

## License
  [MIT](LICENSE)

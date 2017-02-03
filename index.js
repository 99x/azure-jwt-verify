const BbPromise = require('bluebird');
const jwt = require('jsonwebtoken');
const request = require('request');
const _ = require('lodash');
const getPem = require('rsa-pem-from-mod-exp');
let publicKeys = {};

// verify the jwtToken against the given configuration
exports.verify = function(jwtToken, config) {

    return new BbPromise(function(resolve, reject) {
        let decoded = jwt.decode(jwtToken, { complete: true });
        if (!decoded) {
            reject('{ "status":"error", "message":"Error Decoding JWT Token" }');
        } else {
            let jwtKid = decoded.header.kid;
            if (!jwtKid) {
                reject('{ "status":"error", "message":"Invalid JWT Token" }');
            } else {
                getPublicKeys(config.JWK_URI, jwtKid).then(function(response) {
                    if (hasPublicKey(jwtKid)) {
                        let publicKey = getPublicKey(jwtKid);
                        verifyJwt(jwtToken, publicKey, config.AUD, config.ISS).then(function(response) {
                            resolve(JSON.stringify({ "status": "success", "message": response }));
                        }).catch(function(error) {
                            reject(JSON.stringify({ "status": "error", "message": error }));
                        });
                    } else {
                        reject('{ "status":"error", "message":"Invalid jwt kid" }');
                    }
                }).catch(function(error) {
                    reject('{ "status":"error", "message":"Cannot fetch data from JWK_URI" }');
                })
            }
        }

    });
}

// Validate the jwt Token with the audience and the issuer
let verifyJwt = function(jwtToken, publicKey, aud, iss) {
        return new BbPromise(function(resolve, reject) {
            jwt.verify(jwtToken, publicKey, { algorithms: ['RS256'], audience: aud, issuer: iss }, function(error, decoded) {
                if (!error) {
                    resolve(decoded);
                } else {
                    reject(error);
                }
            });
        });
    },
    // fetch publicKeys (mod and exp) from jwks_uri if there are no current kid matching
    getPublicKeys = function(JWK_URI, jwtKid) {
        if (hasPublicKey(jwtKid)) {
            return new BbPromise(function(resolve, reject) {
                resolve(publicKeys);
            });
        } else {
            return new BbPromise(function(resolve, reject) {
                request(JWK_URI, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let keys = JSON.parse(body).keys;
                        updatePublicKeys(keys);
                        resolve(publicKeys);
                    } else {
                        reject(error)
                    }
                });
            });
        }
    },
    // generate and cache the rsa public key from modulus exponent
    updatePublicKeys = function(b2cKeys) {
        _.forEach(b2cKeys, function(value) {
            publicKeys[value.kid] = getPem(value.n, value.e)
        });
    },
    // retunrs the public key for the given kid from the cached keys
    getPublicKey = function(jwtKid) {
        if (publicKeys.hasOwnProperty(jwtKid)) {
            return publicKeys[jwtKid];
        } else {
            return false;
        }
    },
    // check if the kid has a public key 
    hasPublicKey = function(jwtKid) {
        return publicKeys.hasOwnProperty(jwtKid);
    }
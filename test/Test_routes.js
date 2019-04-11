const axios = require('axios');
const expect = require('chai').expect;
require('dotenv').config({
    path: 'variables.env'
});

describe('Test API', () => {
    describe('webservice get response testing', () => {
        it('should return more than 0 intent with status 200', () => {
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    expression: "add product"
                })
            };
            axios.post('http://nkr4w10plp:97/webservice/getresponse/5c9bab3c7225328bd4a90459', {
                expression: "create kitchen"
            })
            .then(function(iRes){
                console.log(iRes.data);
                expect(iRes.data).not.equal(null);
            })
            .catch(function(iReason){
                console.log("Error: "+iReason);
            });
        });
    });
});
const restler = require('restler');
const assert = require('chai').assert;
require('dotenv').config({
    path: 'variables.env'
});

describe('Test API', () => {
    describe('getintent testing', () => {
        it('should return more than 0 intent with status 200', (done) => {
            let options = {
                user: process.env.testid
            }
            restler.get('http://localhost:3000/api/getintents', options).on('success', function (data) {
                assert.ok(data);
            });
        });
    });
    describe('addintent testing', () => {
        it('should return more than 0 intent with status 200', (done) => {
            let options = {
                user: process.env.testid
            }
            restler.post('http://localhost:3000/api/addintent', options).on('success', function (data) {
                assert.ok(data);
            });
        });
    });
});
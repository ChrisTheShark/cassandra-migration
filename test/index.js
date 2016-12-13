'use strict';
const expect = require('chai').expect,
    sinon = require('sinon'),
    entryPoint = require('../index.js');

describe('entryPoint (index.js)', function() {
    it('should respond with usage and error if keyspace is not provided.', function(done) {
        try {
            entryPoint();
        } catch (error) {
            expect(error).to.not.be.null;
            expect(error.name).to.equal('AssertionError');
            expect(error.message).to.equal('usage: npm start <KEYSPACE> ' +
                '<FROM_HOST> <TO_HOST> \nPlease provide a keyspace to migrate.')
            done();
        }
    });

    it('should respond with usage and error if from host is not provided.', function(done) {
        try {
            entryPoint('pricing');
        } catch (error) {
            expect(error).to.not.be.null;
            expect(error.name).to.equal('AssertionError');
            expect(error.message).to.equal('usage: npm start <KEYSPACE> ' +
                '<FROM_HOST> <TO_HOST> \nPlease provide a host to transfer data from.')
            done();
        }
    });

    it('should respond with usage and error if to host is not provided.', function(done) {
        try {
            entryPoint('pricing', 'from_host');
        } catch (error) {
            expect(error).to.not.be.null;
            expect(error.name).to.equal('AssertionError');
            expect(error.message).to.equal('usage: npm start <KEYSPACE> ' +
                '<FROM_HOST> <TO_HOST> \nPlease provide a host to transfer data to.')
            done();
        }
    });
})

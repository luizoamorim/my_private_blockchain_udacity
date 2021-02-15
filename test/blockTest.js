const { describe, it, before, beforeEach, afterEach } = require('mocha')
const assert = require('assert')
const { createSandbox } = require('sinon')
const Request = require('../src/request')
const Events = require('events')
const { Block } = require('../src/block').Block


describe('Block tests', () => {
    const timeout = 15
    let sandbox
    let request
    
    before(() => {
        sandbox = createSandbox()
        request = new Request()
    })

    afterEach(() => sandbox.restore())

    it(`should try to create an genesis block`, async () => {
        
        let block = new BlockClass.Block({data: 'Genesis Block'});        
        
    })

    
})
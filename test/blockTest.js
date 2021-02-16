const { describe, it, before, beforeEach, afterEach } = require('mocha')
const assert = require('assert')
// const { createSandbox } = require('sinon')
// const Request = require('../src/request')
// const Events = require('events')

const Block = require('../src/block')
const BlockChain = require('../src/blockchain')

describe('Block tests', () => {    

    it(`should try to create a block`, async () => {
        
        let block = new Block({data: 'Genesis'})
        assert.fail(await block.getBData(), 'Genesis')                                
    })

    
})

describe('BlockChain tests', () => {    

    it(`should try to create an genesis block`, async () => {
        
        let blockchain = new BlockChain();
        assert.ok(typeof blockchain.chain === 'object')        
        
        
        assert.equal(await blockchain.getChainHeight() , 0)                
    })

    
})
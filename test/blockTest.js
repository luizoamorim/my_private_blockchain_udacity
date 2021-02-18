const { describe, it, before, beforeEach, afterEach } = require('mocha')
const assert = require('assert')
// const { createSandbox } = require('sinon')
// const Request = require('../src/request')
// const Events = require('events')

const Block = require('../src/block.js')
const BlockChain = require('../src/blockchain.js');

describe('Block tests', () => {    
    let block;

    before(() => {
        block = new Block.Block({data: 'Genesis'})
    })

    it(`should try to getBData of a genesis block. It'll generate an error!`, async () => {
        let genesisBlock = new Block.Block({data: 'Genesis'});
        
        assert.rejects(
            async () => {
                await genesisBlock.getBData()
            },
            {
                name:  'Error',
                message: 'You are trying get data from the genesis block!'
            })                                
    })
})

describe('BlockChain tests', () => {    
    let blockchain;

    before(() => {
        blockchain = new BlockChain.Blockchain()
    })

    it(`should try to create a blockchain and initialize with the genesis block`, async () => {
        
        assert.ok(typeof blockchain.chain === 'object')
        assert.equal(await blockchain.getChainHeight() , 1)        
    })

    it(`should try to getBData of a genesis block. It'll generate an error!`, async () => {
        assert.rejects(
            async () => {
                await blockchain.chain[blockchain.getChainHeight()-1].getBData()
            },
            {
                name:  'Error',
                message: 'You are trying get data from the genesis block!'
            }
        )   
    })

    // it(`should try to add blocks on the blockchain!`, async () => {
    //     let addr = 'mzdAC5NL5GgcX5QeE5RFaJzvbEhPkTc7LE';
    //     let signature = 'H7upWrB6Fy3W35SsCdgcIZvFaVk6Lz4pqLBb/ZtLzU7eJ++TRRtFMdse4kawUg0LMQCsavrs5T9zrUAAFvmhsbQ=';
    //     let message = 'mzdAC5NL5GgcX5QeE5RFaJzvbEhPkTc7LE:1613607918:starRegistry'

    //     let verified = await blockchain.submitStar(
    //         addr,
    //         message,
    //         signature,
    //         {
    //             name: 'Estrela teste'
    //         }

    //     )

    //     assert.ok(verified,'object');
    // })
    
})
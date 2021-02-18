# Project Introduction

This project demonstrate the fundamental concepts of a Blockchain platform. 
Concepts like:

```
- Block
- Blockchain
- Wallet
- Blockchain Identity
- Proof of Existence
- Digital Assets
```

In this project I will use a REST Api expose some of the functionalities 
that I'll implement in the private blockchain.

# Problem description
Your employer is trying to make a proof of concept on how a Blockchain 
application can be implemented in his company.

He is an astronomy fan and because of that he spends most of his free time 
searching stars in the sky, that's why he wants to create a test application 
that allows him and his friends to register stars, and track the ownership of 
each.

# What steps are needed to implement your employers application?
1. The application will create a Genesis Block when we run the application.
2. The user will request the application to send a message to be signed using 
a Wallet and in this way verify the ownership over the wallet address. 
The message format will be:
```
<WALLET_ADRESS>:${new Date().getTime().toString().slice(0,-3)}:starRegistry
```
3. Once the user has the message they can use a Wallet (Electrum or Bitcoin 
Core for example) to sign the message.
4. The user will try to submit the Star object for that. The submission will 
consist of: **wallet address**, **message**, **signature** and the 
**star object** with the star information. The Start information will be 
formed in this format:
```
"star": {
    "dec": "68° 52' 56.9",
    "ra": "16h 29m 1.0s",
    "story": "Testing the story 4"
}
```
5. The application will verify if the time elapsed from the request ownership 
(the time is contained in the message) and the time when you submit the star is
 less than 5 minutes.
6. If everything is okay the star information will be stored in the block and 
added to the chain encoding the Star information.
7. The application will allow us to retrieve the Star objects belong to an 
owner (wallet address). This information should be human readable so it 
shouldn't be encoded.

# Tools or technologies 
This application will be created using Node.js and Javascript programming 
language. The architecture will use ES6 classes because it will help us to 
organize the code and facilitate the maintenance of the code.

Some of the libraries or npm modules you will use are:
```
- bitcoinjs-lib@^4.0.3
- bitcoinjs-message@^2.0.0
- body-parser@^1.18.3
- crypto-js@^3.1.9-1
- express@^4.16.4
- hex2ascii@0.0.3
- morgan@^1.9.1
```

## Libraries purpose:

- **bitcoinjs-lib** and **bitcoinjs-message** will help us verify wallet address 
ownership and signatures. 
**Note:** Make sure to always use Legacy Wallet addresses.

- **express** is a node framework used to create The REST Api used in this project

- **body-parser** is used as a middleware module for Express and will help 
us to read the json data submitted in a POST request.

- **crypto-js** is a module containing some of the most important cryptographic
 methods and will help us create the block hash.

- **hex2ascii** will help us decode the data saved in the body of a Block.

```
All this libraries can be found in the package.json file in your project folder.
```

## What do I need to implement to satisfy my employer requirements?

1. `block.js` file. In the `Block` class we are going to implement the method:
    `validate()`. 
    /**
     *  The `validate()` method will validate if the block has been tampered or not.
     *  Been tampered means that someone from outside the application tried to change
     *  values in the block data as a consecuence the hash of the block should be different.
     *  Steps:
     *  1. Return a new promise to allow the method be called asynchronous.
     *  2. Save the in auxiliary variable the current hash of the block (`this` represent the block object)
     *  3. Recalculate the hash of the entire block (Use SHA256 from crypto-js library)
     *  4. Compare if the auxiliary hash value is different from the calculated one.
     *  5. Resolve true or false depending if it is valid or not.
     *  Note: to access the class values inside a Promise code you need to create an auxiliary value `let self = this;`
     */
2. `block.js` file. In the `Block` class we are going to implement the method:
    `getBData()`.
    /**
     *  Auxiliary Method to return the block body (decoding the data)
     *  Steps:
     *  
     *  1. Use hex2ascii module to decode the data
     *  2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
     *  3. Resolve with the data and make sure that you don't need to return the data for the `genesis block` 
     *     or Reject with an error.
     */
3. `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `_addBlock(block)`.
    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't for get 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */
4. `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `requestMessageOwnershipVerification(address)`
    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
5. `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `submitStar(address, message, signature, star)`
    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * Algorithm steps:
     * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
     * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
     * 3. Check if the time elapsed is less than 5 minutes
     * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
     * 5. Create the block and add it to the chain
     * 6. Resolve with the block added.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */
6. `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `getBlockByHash(hash)`
    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
7. `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `getStarsByWalletAddress (address)`
    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * 
     * @param {*} address 
     */
8. `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `validateChain()`
    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check the with the previousBlockHash
     */

# How to test the application functionalities?

To test the application we can use a tool that will help us to make the 
requests to the API, like: POSTMAN or INSOMNIA.

Always is useful to debug the code see what is happening in your algorithm,
 so I will let you this video for you to check on how to do it >https://www.youtube.com/watch?v=6cOsxaNC06c . 
 Try always to debug your code to understand what you are doing.

1. Run this application using the command `node app.js`
You should see in your terminal a message indicating that the server is listening in port 8000:
> Server Listening for port: 8000

2. To make sure the application is working fine and it creates the Genesis Block you can use POSTMAN to request the Genesis block:
    ![Request: http://localhost:8000/block/0 ](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/April/5ca360cc_request-genesis/request-genesis.png)

3. Make your first request of ownership sending your wallet address:
    ![Request: http://localhost:8000/requestValidation ](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/April/5ca36182_request-ownership/request-ownership.png)

4. Sign the message with your Wallet:
    ![Use the Wallet to sign a message](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/April/5ca36182_request-ownership/request-ownership.png)

5. Submit your Star
     ![Request: http://localhost:8000/submitstar](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/April/5ca365d3_signing-message/signing-message.png)

6. Retrieve Stars owned by me
    ![Request: http://localhost:8000/blocks/<WALLET_ADDRESS>](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/April/5ca362b9_retrieve-stars/retrieve-stars.png)


# Bitcoin-core

How to get a new adress:
```
getnewaddress "mylabel" "legacy"
```
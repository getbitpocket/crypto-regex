var regex = require('../index');
var bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39');

var REGEX_BITCOIN_ADDRESS = regex['bitcoin-address'];
var REGEX_XPUB_KEY = regex['bitcoin-xpub-key'];
var REGEX_BITCOIN_URI = regex['bitcoin-uri'];
var REGEX_TESTNET_ADDRESS = regex['testnet-address'];
var REGEX_TPUB_KEY = regex['testnet-tpub-key'];
var REGEX_TESTNET_URI = regex['testnet-uri'];

describe('crypto-regex-bitcoin', function() {

    it('should be a correct bitcoin address', function() {
        var address = bitcoin.ECPair.makeRandom().getAddress();
        var match = address.match("^(" + REGEX_BITCOIN_ADDRESS + ")$");
        expect(match[1]).toEqual(address);
    });

    it('should be a correct xpub key', function() {
        var mnemonic = bip39.generateMnemonic();
        var seed = bip39.mnemonicToSeed(mnemonic);
        var hdNode = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.bitcoin);
        var match = hdNode.neutered().toBase58().match("^(" + REGEX_XPUB_KEY + ")$");
        expect(match[1]).toEqual(hdNode.neutered().toBase58());
    });

    it('should be a correct bitcoin uri', function() {
        var address = bitcoin.ECPair.makeRandom().getAddress();
        var bitcoinUri = "bitcoin:" + address + "?something=xyz";
        var match = bitcoinUri.match("^" + REGEX_BITCOIN_URI);
        expect(match[1]).toEqual(address);
    });

});

describe('crypto-regex-testnet', function() {

    it('should be a correct testnet address', function() {
        var address = bitcoin.ECPair.makeRandom({
            network : bitcoin.networks.testnet
        }).getAddress();
        var match = address.match("^(" + REGEX_TESTNET_ADDRESS + ")$");
        expect(match[1]).toEqual(address);
    });

    it('should be a correct tpub key', function() {
        var mnemonic = bip39.generateMnemonic();
        var seed = bip39.mnemonicToSeed(mnemonic);
        var hdNode = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.testnet);
        var match = hdNode.neutered().toBase58().match("^(" + REGEX_TPUB_KEY + ")$");
        expect(match[1]).toEqual(hdNode.neutered().toBase58());
    });

    it('should be a correct testnet uri', function() {
        var address = bitcoin.ECPair.makeRandom({
            network : bitcoin.networks.testnet
        }).getAddress();
        var bitcoinUri = "bitcoin:" + address + "?something=xyz";
        var match = bitcoinUri.match("^" + REGEX_TESTNET_URI);
        expect(match[1]).toEqual(address);
    });

    it('should be a correct tpub key from schildbach wallet', function() {
        var pubKeyExport = "tpubD8dWq6wHd9sXLeDZ8hiYixYvqApcRBgiYhtKVhEozbhMZBA4qgYtTXtfPWqWKdFXB2uKxptSZiR9LQ4kjNSBNmWfxPFhEByzJx3X9ry4mWw?c=1490794392&h=bip32";
        var pubKeyOnly = "tpubD8dWq6wHd9sXLeDZ8hiYixYvqApcRBgiYhtKVhEozbhMZBA4qgYtTXtfPWqWKdFXB2uKxptSZiR9LQ4kjNSBNmWfxPFhEByzJx3X9ry4mWw";
        var match = pubKeyExport.match("^(" + REGEX_TPUB_KEY + ")$");
        expect(match[2]).toEqual(pubKeyOnly);
    });

});
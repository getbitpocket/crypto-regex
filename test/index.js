var regex = require('../index');
var bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39');

var REGEX_BITCOIN_ADDRESS = regex['bitcoin-address'];
var REGEX_XPUB_KEY = regex['bitcoin-xpub-key'];
var REGEX_BITCOIN_URI = regex['bitcoin-uri'];

describe('crypto-regex', function() {

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
function Tariff(name, messageTypes, price) {
    this._name = name;
    this._messageTypes = messageTypes;
    this._price = price;
}

Tariff.prototype.getName = function() {
    return this._name;
}

Tariff.prototype.setName = function(name) {
    this._name = name;
}

Tariff.prototype.getMessageTypes = function() {
        return this._messageTypes;
    }
    // addd
Tariff.prototype.addMessageTypes = function(messageTypes) {
    var concatArr = [];
    for (var i = 0; i < messageTypes.length; i++) {
        this._messageTypes.forEach(function(item) {
            if (messageTypes[i] !== item) {
                concatArr.push(messageTypes[i]);
            }
        });
    }
    this._messageTypes = this._messageTypes.concat(concatArr);
}

Tariff.prototype.deleteMessageTypes = function(messageTypes) {
    _.pullAll(this._messageTypes, messageTypes);
}

Tariff.prototype.getPrice = function() {
    return this._price;
}

Tariff.prototype.setPrice = function(price) {
    this._price = price;
}
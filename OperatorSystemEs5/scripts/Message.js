function Message(creator, reciever, body) {
    this._id = Message.generateId();
    this._creator = creator;
    this._reciever = reciever;
    this._body = body;
    this._type = null;
}

Message.generateId = (function() {
    var currentId = 1;
    return function() {
        return currentId++;
    };
})();

Message.prototype.getId = function() {
    return this._id;
}

Message.prototype.getCreator = function() {
    return this._creator;
}

Message.prototype.getReciever = function() {
    return this._reciever;
}

Message.prototype.getBody = function() {
    return this._body;
}

Message.prototype.getType = function() {
    return this._type;
}

Message.prototype.setType = function(type) {
    this._type = type;
}
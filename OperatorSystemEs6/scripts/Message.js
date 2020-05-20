class Message {
    constructor(creator, reciever, body) {
        this._id = Message.generateId();
        this._creator = creator;
        this._reciever = reciever;
        this._body = body;
        this._type = null;
    }

    static generateId = (() => {
        let currentId = 1;
        return () => {
            return currentId++;
        }
    })()

    get id() {
        return this._id;
    }

    get creator() {
        return this._creator;
    }

    get reciever() {
        return this._reciever;
    }

    get body() {
        return this._body;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }
}
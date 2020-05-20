class Tariff {
    constructor(name, messageTypes, price) {
        this._id = Tariff.generateId()
        this._name = name;
        this._messageTypes = messageTypes;
        this._price = price;
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

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get messageTypes() {
        return this._messageTypes;
    }

    addMessageTypes(messageTypes) {
        const concatArr = [];
        for (let i = 0; i < messageTypes.length; i++) {
            this._messageTypes.forEach((item) => {
                if (messageTypes[i] !== item) {
                    concatArr.push(messageTypes[i]);
                }
            })
        }
        this._messageTypes = this._messageTypes.concat(concatArr);
    }

    deleteMessageTypes(messageTypes) {
        _.pullAll(this._messageTypes, messageTypes);
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }
}
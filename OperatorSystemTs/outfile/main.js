"use strict";
class BalanceError extends Error {
    constructor(money) {
        super(`The payment ${money} was not withdrawn! Insufficient funds!`);
        this.name = "BalanceError";
    }
}
class List {
    constructor() {
        this.list = [];
    }
    add(item) {
        this.list.push(item);
    }
    remove(item) {
        const index = this.list.indexOf(item);
        if (index != -1) {
            this.removeByIndex(index);
        }
    }
    getByIndex(index) {
        if (index >= 0) {
            return this.list[index] || null;
        }
        else {
            return null;
        }
    }
    removeByIndex(index) {
        if (index >= 0) {
            this.list.splice(index, 1);
        }
        // add if non exist
    }
    getById(id) {
        const result = this.list.find((item) => item.id === id);
        return result || null;
    }
    ;
    removeById(id) {
        const item = this.getById(id);
        if (item) {
            this.list.splice(this.list.indexOf(item), 1);
        }
    }
    ;
    toArray() {
        return this.list;
    }
    clear() {
        this.list = [];
    }
    size() {
        return this.list.length;
    }
}
class Manager {
    constructor(tariffList, userList, messageList) {
        this._tariffList = tariffList;
        this._userList = userList;
        this._messageList = messageList;
    }
    get tariffList() {
        return this._tariffList;
    }
    getTariffById(id) {
        return this._tariffList.getById(id);
    }
    getTariffByName(name) {
        const tariff = this._tariffList.toArray().find(item => item.name === name);
        return tariff || null;
    }
    addTariff(tariff) {
        const isTariffExist = this._tariffList.toArray().some((item) => {
            return item.name === tariff.name;
        });
        if (!isTariffExist) {
            this._tariffList.add(tariff);
        }
    }
    deleteTariffByName(name) {
        const tariff = this.getTariffByName(name);
        if (tariff) {
            this._tariffList.remove(tariff);
        }
    }
    getUserById(id) {
        return this._userList.getById(id);
    }
    getUserByPhone(phone) {
        const user = this._userList.toArray().find(item => item.phone === phone);
        if (user) {
            return user;
        }
        else {
            return null;
        }
        ;
    }
    addUser(user) {
        const isExistPhone = this._userList.toArray().some((item) => {
            return user.phone === item.phone;
        });
        if (!isExistPhone) {
            this._userList.add(user);
        }
    }
    deleteUserByPhone(phone) {
        const user = this.getUserByPhone(phone);
        if (user) {
            this._userList.remove(user);
        }
    }
    getUserTariff(phone) {
        const user = this.getUserByPhone(phone);
        if (user) {
            return user.tariff;
        }
        else {
            return null;
        }
    }
    setUserTariff(phone, name) {
        const user = this.getUserByPhone(phone);
        if (user) {
            const tariff = this.getTariffByName(name);
            if (tariff) {
                user.tariff = tariff;
            }
        }
    }
    getUserBalance(phone) {
        const user = this.getUserByPhone(phone);
        if (user) {
            return user.balance;
        }
        else {
            return null;
        }
    }
    addUserBalance(phone, balance) {
        const user = this.getUserByPhone(phone);
        if (user) {
            user.addBalance(balance);
        }
    }
    withdrawPayOfTariff(phone) {
        const user = this.getUserByPhone(phone);
        if (user) {
            const tariff = this.getUserTariff(phone);
            if (tariff && user.payStatus === false) {
                user.removeBalance(tariff.price);
                user.payStatus = true;
            }
        }
    }
    getMessageById(id) {
        return this._messageList.getById(id) || null;
    }
    getRecieverMessages(phone) {
        return this._messageList.toArray().filter(item => item.reciever === phone);
    }
    getCreatorMessages(phone) {
        return this._messageList.toArray().filter(item => item.creator === phone);
    }
    static setMessageType(message) {
        const messageBody = message.body;
        const length = messageBody.length;
        switch (true) {
            case length <= 10:
                message.type = MessageType.short;
                break;
            case length > 10 && length <= 30:
                message.type = MessageType.middle;
                break;
            case length > 30 && length <= 60:
                message.type = MessageType.large;
                break;
            default:
                message.type = MessageType.extraLarge;
        }
    }
    addMessage(message) {
        this._messageList.add(message);
    }
    deleteMessageById(id) {
        const message = this.getMessageById(id);
        if (message) {
            this._messageList.remove(message);
        }
    }
    isAvialableMessageType(message) {
        Manager.setMessageType(message);
        const tariff = this.getUserTariff(message.creator);
        if (tariff === null || message.type === null) {
            return false;
        }
        return tariff.messageTypes.includes(message.type);
    }
    sendMessage(message) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const creator = this.getUserByPhone(message.creator);
                const reciever = this.getUserByPhone(message.reciever);
                if (creator && reciever) {
                    if (creator.payStatus) {
                        if (this.isAvialableMessageType(message)) {
                            this.addMessage(message);
                        }
                        else {
                            reject(`This type of message in message ${message.id} not available in the current tariff`);
                        }
                    }
                    else {
                        reject(`The tariff was not paid. You cannot send the message ${message.id}`);
                    }
                }
                else {
                    reject(`Creator or reciever not found in message ${message.id}`);
                }
                resolve(this.getRecieverMessages(message.reciever));
            }, 2000);
        });
    }
}
let Message = /** @class */ (() => {
    class Message {
        constructor(creator, reciever, body) {
            this._id = Message.generateId();
            this._creator = creator;
            this._reciever = reciever;
            this._body = body;
            this._type = null;
        }
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
    Message.generateId = (() => {
        let currentId = 1;
        return () => {
            return currentId++;
        };
    })();
    return Message;
})();
var MessageType;
(function (MessageType) {
    MessageType[MessageType["short"] = 0] = "short";
    MessageType[MessageType["middle"] = 1] = "middle";
    MessageType[MessageType["large"] = 2] = "large";
    MessageType[MessageType["extraLarge"] = 3] = "extraLarge";
})(MessageType || (MessageType = {}));
let Tariff = /** @class */ (() => {
    class Tariff {
        constructor(name, messageTypes, price) {
            this._id = Tariff.generateId();
            this._name = name;
            this._messageTypes = messageTypes;
            this._price = price;
        }
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
                });
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
    Tariff.generateId = (() => {
        let currentId = 1;
        return () => {
            return currentId++;
        };
    })();
    return Tariff;
})();
let User = /** @class */ (() => {
    class User {
        constructor(phone, balance) {
            this._id = User.generateId();
            this._phone = phone;
            this._balance = balance;
            this._tariff = null;
            this._payStatus = false;
        }
        get id() {
            return this._id;
        }
        get phone() {
            return this._phone;
        }
        set phone(phone) {
            this._phone = phone;
        }
        get balance() {
            return this._balance;
        }
        addBalance(money) {
            if (money > 0) {
                this._balance += money;
            }
        }
        removeBalance(money) {
            if (money > 0) {
                if (this._balance >= money) {
                    this._balance -= money;
                }
                else {
                    throw new BalanceError(money);
                }
            }
        }
        get tariff() {
            return this._tariff || null;
        }
        set tariff(tariff) {
            this._tariff = tariff;
        }
        get payStatus() {
            return this._payStatus;
        }
        set payStatus(status) {
            this._payStatus = status;
        }
    }
    User.generateId = (() => {
        let currentId = 1;
        return () => {
            return currentId++;
        };
    })();
    return User;
})();
let tariff1 = new Tariff('Simple Tariff', [MessageType.short], 30);
let tariff2 = new Tariff('All inclusive', [MessageType.short, MessageType.middle, MessageType.large, MessageType.extraLarge], 200);
let tariff4 = new Tariff('Middle', [MessageType.short, MessageType.middle], 150);
let tariff3 = new Tariff('Extra grand', [MessageType.large, MessageType.short, MessageType.middle], 322);
let user1 = new User('098', 654);
let user2 = new User('089', 8945);
let user3 = new User('097654', 945);
let mess1 = new Message('098', '097654', 'mess1');
let mess2 = new Message('097654', '098', 'mesjhkhs1hjk');
let mess3 = new Message('089', '097654', 'meshbmbhs1');
let mess4 = new Message('098', '089', 'bodykjfffffffffffffffffsfdsfsfsfdffggddddddddgfdddddddddddgfdfgfkjkjkjmess2');
let tariffList = new List();
let userList = new List();
let messageList = new List();
let manager = new Manager(tariffList, userList, messageList);
console.log(user1, user2, user3, tariff1, tariff2, tariff3, tariff4, mess1, mess2, mess3, mess4);
manager.addTariff(tariff1);
manager.addTariff(tariff2);
manager.addTariff(tariff3);
manager.addTariff(tariff4);
manager.addUser(user1);
manager.addUser(user2);
manager.addUser(user3);
console.log(manager.tariffList); //getter
console.log(manager.getTariffById(1));
console.log(manager.getTariffById(4)); //null
console.log(manager.getTariffByName("All")); //null
console.log(manager.getTariffByName('Extra grand'));
manager.deleteTariffByName('Extra grand');
console.log(manager.getTariffByName('Extra grand')); //null
console.log(manager.getUserById(1));
console.log(manager.getUserById(10)); // null
console.log(manager.getUserByPhone('098'));
console.log(manager.getUserByPhone('228322')); // null
manager.deleteUserByPhone('089');
console.log(manager.getUserByPhone('089'));
console.log(manager.getUserTariff('098')); // null
manager.setUserTariff('098', 'All inclusive');
console.log(manager.getUserTariff('098'));
console.log(manager.getUserBalance('098'));
manager.addUserBalance('098', 1000);
console.log(manager.getUserBalance('098'));
manager.withdrawPayOfTariff('098');
console.log(manager.getUserBalance('098'));
manager.addMessage(mess1);
console.log(manager.getMessageById(1));
console.log(manager.getMessageById(5)); //null
console.log(manager.getCreatorMessages('098'));
console.log(manager.getRecieverMessages('097654'));
manager.deleteMessageById(1);
manager.setUserTariff('097654', 'Middle');
console.log(manager.getUserTariff('097654'));
manager.withdrawPayOfTariff('097654');
//console.log(manager.isAvialableMessageType(mess1));
manager.sendMessage(mess1)
    .then(data => {
    console.log('Received messages:', data);
    return manager.sendMessage(mess2);
})
    .then(data => {
    console.log('Received messages:', data);
    return manager.sendMessage(mess3);
})
    .then(data => console.log('Received messages:', data))
    .catch(err => console.log(err));
// async function sendMess(mess: IMessagable) {
//     const data = await manager.sendMessage(mess);
//     console.log(data);
// }
// (async() => {
//     try {
//         await sendMess(mess1);
//         await sendMess(mess2);
//         await sendMess(mess3);
//         await sendMess(mess4);
//     } catch (err) {
//         console.log(err);
//     } finally {
//         () => console.log('The Promise is finished');
//     }
// })();
// // try {
// //     manager.sendMessage(mess1)
// //         .then(data => console.log('Received messages:', data),
// //             manager.sendMessage(mess2))
// //         .then(data => console.log('Received messages:', data),
// //             manager.sendMessage(mess2))
// //         .then(data => console.log('Received messages:', data))  
// // } catch (e) {
// //     console.log(e);
// // }
//# sourceMappingURL=main.js.map
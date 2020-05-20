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
        this.removeByIndex(index);
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
        // add if negative index
    }
    getById(id) {
        const rezult = this.list.find((item) => item.id === id);
        return rezult || null;
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
        return this._tariffList.toArray().find((item) => {
            return item.name === name;
        });
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
        return this._userList.toArray().find(item => item.phone === phone);
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
        return this._messageList.getById(id);
    }
    getRecieverMessages(phone) {
        return this._messageList.toArray().filter(item => item.reciever === phone);
    }
    getCreatorMessages(phone) {
        return this._messageList.toArray().filter(item => item.creator === phone);
    }
    _setMessageType(message) {
        const messageBody = message.body;
        const length = messageBody.length;
        switch (true) {
            case length <= 10:
                message.type = 'short';
                break;
            case length > 10 && length <= 30:
                message.type = 'middle';
                break;
            case length > 30 && length <= 60:
                message.type = 'large';
                break;
            default:
                message.type = 'extra large';
        }
    }
    addMessage(message) {
        this._messageList.add(message);
    }
    //pull => splice
    deleteMessageById(id) {
        const message = this.getMessageById(id);
        if (message) {
            this._messageList.remove(message);
        }
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
            return this.id;
        }
        get phone() {
            return this._phone;
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
let user1 = new User("098", 654);
let user2 = new User('089', 8945);
let user3 = new User('097654', 945);
let tariff1 = new Tariff('Simple Tariff', ['short'], 30);
let tariff2 = new Tariff('All inclusive', ['short', 'middle', 'large', 'extra large'], 100);
let mess1 = new Message('089', '097654', 'mess1');
let mess2 = new Message('097654', '089', 'mesjhkhs1');
let mess3 = new Message('09765', '089', 'meshbmbhs1');
console.log(mess1, mess2, mess3);
console.log(tariff1, tariff2);
console.log(user1, user2, user3);
// let manager = new Manager();
// var mess1 = new Message('089', '097654', 'mess1');
// var mess2 = new Message('097654', '089', 'mesjhkhs1');
// var mess3 = new Message('09765', '089', 'meshbmbhs1');
// var mess4 = new Message('097654', '089', 'bodykjfffffffffffffffffsfdsfsfsfdffggddddddddgfdddddddddddgfdfgfkjkjkjmess2');
// manager.addTariff(tariff1);
// manager.addTariff(tariff2);
// manager.getTariffByName("All inclusive");
// //manager.deleteTariffByName('All inclusive');
// manager.getTariffByName('Simple Tariff');
// manager.addUser(user1);
// manager.addUser(user2);
// manager.getUserByPhone('097654');
// //manager.deleteUserByPhone('097654');
// manager.getUserTariff('089');
// manager.setUserTariff('097654', 'Simple Tariff');
// manager.setUserTariff('089', 'All inclusive');
// manager.getUserBalance('097654');
// manager.addUserBalance('089', 800);
// manager.withdrawPayOfTariff('097654');
// manager.withdrawPayOfTariff('089');
// manager.getTariffById(1);
// manager.getUserById(1);
// manager.getMessageById(2);
// // manager.addMessage(mess1);
// // manager.addMessage(mess2);
// // manager.addMessage(mess3);
// // manager.addMessage(mess4);
// // manager.getMessageById(1);
// // manager.getRecieverMessages('097654');
// // manager.getCreatorMessages('089');
// //manager.deleteMessageById(1);
// // manager.sendMessage(mess2)
// // manager.sendMessage(mess3)
// // manager.sendMessage(mess1)
// // manager.sendMessage(mess4)
// // manager.sendMessage(mess3)
// // manager.sendMessage(mess1)
// //     .then(data => {
// //         console.log('Received messages:', data);
// //         return manager.sendMessage(mess2);
// //     })
// //     .then(data => {
// //         console.log('Received messages:', data);
// //         return manager.sendMessage(mess3);
// //     })
// //     .then(data => console.log('Received messages:', data))
// //     .catch(err => console.log(err))
// //     .finally(() => console.log('The Promise is finished'))
// // async function sendMess(mess) {
// //     const data = await manager.sendMessage(mess);
// //     console.log(data);
// // }
// // (async() => {
// //     try {
// //         await sendMess(mess1);
// //         await sendMess(mess2);
// //         await sendMess(mess3);
// //         await sendMess(mess4);
// //     } catch (err) {
// //         console.log(err);
// //     } finally {
// //         () => console.log('The Promise is finished');
// //     }
// // })()
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
class Manager {
    constructor() {
        this._tariffList = [];
        this._userList = [];
        this._messageList = [];
    }

    static getItemById(id, list) {
        return list.find(item => item.id === id);
    }

    get tariffList() {
        return this._tariffList;
    }

    getTariffById(id) {
        return Manager.getItemById(id, this._tariffList);
    }

    getTariffByName(name) {
        return this._tariffList.find((item) => {
            return item.name === name;
        });
    }

    addTariff(tariff) {
        const isTariffExist = this._tariffList.some((item) => {
            return item.name === tariff.name;
        });
        if (!isTariffExist) {
            this._tariffList.push(tariff);
        }
    }

    deleteTariffByName(name) {
        const tariff = this.getTariffByName(name);
        if (tariff) {
            this._tariffList.splice(this._tariffList.indexOf(tariff), 1);
        }
    }

    getUserById(id) {
        return Manager.getItemById(id, this._userList);
    }

    getUserByPhone(phone) {
        return this._userList.find(item => item.phone === phone);
    }

    addUser(user) {
        const isExistPhone = this._userList.some((item) => {
            return user.phone === item.phone;
        });
        if (!isExistPhone) {
            this._userList.push(user);
        }
    }

    deleteUserByPhone(phone) {
        const user = this.getUserByPhone(phone);
        if (user) {
            this._userList.splice(this._userList.indexOf(user), 1);
        }
    }

    getUserTariff(phone) {
        const user = this.getUserByPhone(phone);
        if (user) {
            //console.log(user.tariff);
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
        return Manager.getItemById(id, this._messageList);
    }

    getRecieverMessages(phone) {
        return this._messageList.filter(item => item.reciever === phone);
    }

    getCreatorMessages(phone) {
        return this._messageList.filter(item => item.creator === phone);
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
            this._messageList.push(message);
        }
        //pull => splice

    deleteMessageById(id) {
        const message = this.getMessageById(id);
        if (message) {
            this._messageList.splice(this._messageList.indexOf(message), 1);
        }
    }

    sendMessage(message) { //param callback
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const creatorPhone = message.creator;
                const creator = this.getUserByPhone(creatorPhone);
                const recieverPhone = message.reciever;
                const reciever = this.getUserByPhone(recieverPhone);
                if (creator && reciever) {
                    if (creator.payStatus) {
                        this._setMessageType(message);

                        var messagesTypesArr = this.getUserTariff(creatorPhone).messageTypes;
                        if (messagesTypesArr.includes(message.type)) {
                            this.addMessage(message);
                        } else {
                            reject(`This type of message in message ${message.id} not available in the current tariff`);
                        }
                    } else {
                        reject(`The tariff was not paid. You cannot send the message ${message.id}`);
                    }
                } else {
                    reject(`Creator or reciever not found in message ${message.id}`);
                }
                resolve(this.getRecieverMessages(recieverPhone));
            }, 2000);
        });

    }
}
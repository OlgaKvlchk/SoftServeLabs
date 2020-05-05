function Manager() {
    this._tariffList = []; //tariff1
    this._userList = [];
    this._messageList = [];
}

Manager.prototype.getTariffList = function() {
    return this._tariffList;
}

Manager.prototype.getTariffByName = function(name) {
    return this._tariffList.find(function(tariff) { //filter
        return tariff.getName() === name;
    });
}

//New check if exist 
Manager.prototype.addTariff = function(tariff) {
    var isTariffExist = this._tariffList.some(function(item) {
        return item.getName() === tariff.getName();
    });
    if (!isTariffExist) {
        this._tariffList.push(tariff);
    }
}

//_.pull(); => splice indexOf
Manager.prototype.deleteTariffByName = function(name) {
        var tariff = this.getTariffByName(name);
        if (tariff) {
            this._tariffList.splice(this._tariffList.indexOf(tariff), 1);
        }
    }
    // 
Manager.prototype.getUserByPhone = function(phone) {
        return this._userList.find(function(user) {
            return user.getPhone() === phone;
        });
    }
    //if user exist// A если сюда передадут не тип Юзер? тогда getPhone не сработает
Manager.prototype.addUser = function(user) {
        var isExistPhone = this._userList.some(function(item) {
            return user.getPhone() === item.getPhone()
        });
        if (!isExistPhone) {
            this._userList.push(user);
        }
    }
    //_.pull(); => splice indexOf
Manager.prototype.deleteUserByPhone = function(phone) {
    var user = this.getUserByPhone(phone);
    if (user) {
        this._userList.splice(this._userList.indexOf(user), 1);
    }
}

Manager.prototype.getUserTariff = function(phone) {
    var user = this.getUserByPhone(phone);
    if (user) {
        return user.getTariff(); //
    }
}

Manager.prototype.setUserTariff = function(phone, name) {
        //exception if user or tariff non exist
        var user = this.getUserByPhone(phone);
        if (user) {
            var tariff = this.getTariffByName(name);
        }
        if (tariff) {
            user.setTariff(tariff);
        }
    }
    //
Manager.prototype.getUserBalance = function(phone) {
        var user = this.getUserByPhone(phone);
        if (user) {
            return user.getBalance();
        }
    }
    //
Manager.prototype.addUserBalance = function(phone, balance) {
    var user = this.getUserByPhone(phone);
    if (user) {
        user.addBalance(balance);
    }
}

Manager.prototype.withdrawPayOfTariff = function(phone) { //withdraw
    var user = this.getUserByPhone(phone);
    if (user) {
        var userTariff = this.getUserTariff(phone);

        if (userTariff && user.getPayStatus() === false) {
            user.removeBalance(userTariff.getPrice());
            user.setPayStatus(true);
        }
    }
}

Manager.prototype.getMessageById = function(id) {
    return this._messageList.find(function(message) {
        return message.getId() === id;
    });
}

Manager.prototype.getRecieverMessages = function(phone) {
    return this._messageList.filter(function(message) {
        return message.getReciever() === phone;
    });
}

Manager.prototype.getCreatorMessages = function(phone) {
    return this._messageList.filter(function(message) {
        return message.getCreator() === phone;
    });
}

//private
Manager.prototype._setMessageType = function(message) {
    var messageBody = message.getBody();
    var length = messageBody.length;
    switch (true) {
        case length <= 10:
            message.setType('short');
            break;
        case length > 10 && length <= 30:
            message.setType('middle');
            break;
        case length > 30 && length <= 60:
            message.setType('large');
            break;
        default:
            message.setType('extra large');
    }
}

Manager.prototype.addMessage = function(message) {
        this._messageList.push(message);
    }
    //pull => splice
Manager.prototype.deleteMessageById = function(id) {
    var message = this.getMessageById(id);
    if (message) {
        this._messageList.splice(this._messageList.indexOf(message), 1);
    }
}

// Manager.prototype.sendMessage = function(message) { //param callback
//     var creator = this.getUserByPhone(message.getCreator());
//     if (creator) {
//         var reciever = this.getUserByPhone(message.getReciever());
//         if (reciever && creator.getPayStatus()) {
//             this._setMessageType(message);

//             var messagesTypesArr = this.getUserTariff(message.getCreator()).getMessageTypes();
//             if (messagesTypesArr.includes(message.getType())) {
//                 this.addMessage(message);
//             }
//         }
//     }
// }
debugger
Manager.prototype.sendMessageAsync = function(message, callback) { //param callback
    setTimeout(function() {
        var error = null;
        var creatorPhone = message.getCreator();
        var creator = this.getUserByPhone(creatorPhone);
        if (creator) {
            var recieverPhone = message.getReciever();
            var reciever = this.getUserByPhone(recieverPhone);
            if (reciever && creator.getPayStatus()) {
                this._setMessageType(message);

                var messagesTypesArr = this.getUserTariff(creatorPhone).getMessageTypes();
                if (messagesTypesArr.includes(message.getType())) {
                    this.addMessage(message);
                }
            } // add err
        } else {
            error = 'Creator not found';

        }
        if (callback) {
            callback(error, this.getRecieverMessages(recieverPhone));
        }
    }.bind(this), 2000);
}

//debugger
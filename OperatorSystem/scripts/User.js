function User(phone, balance) {
    this._phone = phone;
    this._balance = balance;
    this._tariff = null;
    this._payStatus = false;
}

User.prototype.getPhone = function() {
    return this._phone;
}

User.prototype.getBalance = function() {
    return this._balance;
}

User.prototype.addBalance = function(money) {
    if (money > 0) {
        this._balance += money;
    }
}

User.prototype.removeBalance = function(money) {
    if (money > 0) {
        if (this._balance >= money) {
            this._balance -= money;
        } else {
            throw new BalanceError(money);
        }
    }
}

User.prototype.getTariff = function() {
    return this._tariff;
}

User.prototype.setTariff = function(tariff) {
    this._tariff = tariff;
}

User.prototype.getPayStatus = function() {
    return this._payStatus;
}

User.prototype.setPayStatus = function(status) {
    this._payStatus = status;
}
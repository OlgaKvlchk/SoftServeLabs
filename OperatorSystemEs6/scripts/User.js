class User {
    constructor(phone, balance) {
        this._id = User.generateId();
        this._phone = phone;
        this._balance = balance;
        this._tariff = null;
        this._payStatus = false;
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
            } else {
                throw new BalanceError(money);
            }
        }
    }

    get tariff() {
        return this._tariff;
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
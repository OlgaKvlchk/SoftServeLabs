function BalanceError(money) {

    this.name = "BalanceError";
    this.message = `The payment ${money} was not withdrawn! Insufficient funds!`;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack;
    }

}

BalanceError.prototype = Object.create(Error.prototype);
BalanceError.prototype.constructor = BalanceError;
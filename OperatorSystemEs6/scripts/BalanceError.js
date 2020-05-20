class BalanceError extends Error {
    constructor(money) {
        super(`The payment ${money} was not withdrawn! Insufficient funds!`);
        this.name = "BalanceError";
    }
}
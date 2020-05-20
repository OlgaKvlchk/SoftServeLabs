class BalanceError extends Error {
    constructor(money: number) {
        super(`The payment ${money} was not withdrawn! Insufficient funds!`);
        this.name = "BalanceError";
    }
}
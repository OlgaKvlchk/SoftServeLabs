class User implements IUserable{
    private _id: number;
    private _phone: string;
    private _balance: number;
    private _tariff: ITarifable | null;
    private _payStatus: boolean;
    public constructor(phone: string, balance: number) {
        this._id  = User.generateId();
        this._phone = phone;
        this._balance = balance;
        this._tariff = null;
        this._payStatus = false;
    }

   private static generateId = (() => {
        let currentId = 1;
        return () => {
            return currentId++;
        }
    })();

    public get id(): number {
            return this._id; 
    }

    public get phone(): string {
        return this._phone;
    }

    public set phone(phone: string){
        this._phone = phone;
    }

    public get balance(): number {
        return this._balance;
    }

    public addBalance(money: number): void {
        if (money > 0) {
            this._balance += money;
        }
    }

    public removeBalance(money: number): void {
        if (money > 0) {
            if (this._balance >= money) {
                this._balance -= money;
            } else {
                throw new BalanceError(money);
            }
        }
    }

    public get tariff(): ITarifable | null {
        return this._tariff || null;
    }

    public set tariff(tariff: ITarifable | null) {
        this._tariff = tariff;
    }

    public get payStatus(): boolean {
        return this._payStatus;
    }

    public set payStatus(status: boolean) {
        this._payStatus = status;
    }
}
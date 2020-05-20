class Tariff implements ITarifable {
    private _id: number;
    private _name: string;
    private _messageTypes: string[];
    private _price: number;
    constructor(name: string, messageTypes: string[], price: number) {
        this._id = Tariff.generateId()
        this._name = name;
        this._messageTypes = messageTypes;
        this._price = price;
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

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get messageTypes(): string[] {
        return this._messageTypes;
    }

    public addMessageTypes(messageTypes: string[]): void {
        const concatArr: string[] = [];
        for (let i = 0; i < messageTypes.length; i++) {
            this._messageTypes.forEach((item: string) => {
                if (messageTypes[i] !== item) {
                    concatArr.push(messageTypes[i]);
                }
            })
        }
        this._messageTypes = this._messageTypes.concat(concatArr);
    }

    public deleteMessageTypes(messageTypes: string[]): void {
        _.pullAll(this._messageTypes, messageTypes);
    }

    public get price(): number {
        return this._price;
    }

    public set price(price: number) {
        this._price = price;
    }
}

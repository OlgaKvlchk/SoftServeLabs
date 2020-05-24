class Message implements IMessagable {
    private _id: number;
    private _creator: string;
    private _reciever: string;
    private _body: string;
    private _type: MessageType | null;
    public constructor(creator: string, reciever: string, body: string) {
        this._id = Message.generateId();
        this._creator = creator;
        this._reciever = reciever;
        this._body = body;
        this._type = null;
    }

    private static generateId = (() => {
        let currentId = 1;
        return () => {
            return currentId++;
        }
    })()

    public get id(): number {
        return this._id;
    }

    public get creator(): string {
        return this._creator;
    }

    public get reciever(): string {
        return this._reciever;
    }

    public get body(): string {
        return this._body;
    }

    public get type(): MessageType | null {
        return this._type;
    }

    public set type(type) {
        this._type = type;
    }
}

class Manager  {
    private _tariffList: IListable<ITarifable>;
    private _userList: IListable<IUserable>;
    private _messageList: IListable<IMessagable>;
    public constructor(tariffList: IListable<ITarifable>, 
                userList:IListable<IUserable>, 
                messageList: IListable<IMessagable>) {
        this._tariffList = tariffList;
        this._userList = userList;
        this._messageList = messageList;
    }

    public get tariffList(): IListable<ITarifable> {
        return this._tariffList;
    }

    public getTariffById(id: number): ITarifable | null {
        return this._tariffList.getById(id);
    }

    public getTariffByName(name: string): ITarifable | undefined {
        return this._tariffList.toArray().find((item) => {
            return item.name === name;
        });
    }

    public addTariff(tariff: ITarifable): void {
        const isTariffExist = this._tariffList.toArray().some((item) => {
            return item.name === tariff.name;
        });
        if (!isTariffExist) {
            this._tariffList.add(tariff);
        }
    }

    public deleteTariffByName(name: string): void {
        const tariff = this.getTariffByName(name);
        if (tariff) {
                this._tariffList.remove(tariff);
        }
    }

    public getUserById(id: number): IUserable | null {
        return this._userList.getById(id);
    }

    public getUserByPhone(phone: string): IUserable | undefined {
        return this._userList.toArray().find(item => item.phone === phone);
    }

    public addUser(user: IUserable): void {
        const isExistPhone = this._userList.toArray().some((item) => {
            return user.phone === item.phone;
        });
        if (!isExistPhone) {
            this._userList.add(user);
        }
    }

    public deleteUserByPhone(phone: string): void {
        const user = this.getUserByPhone(phone);
        if (user) {
            this._userList.remove(user);
        }
    }

    public getUserTariff(phone: string): ITarifable | null {
        const user = this.getUserByPhone(phone);
        if (user) {
            return user.tariff;
        } else {
            return null;
        } 
    }

    public setUserTariff(phone: string, name: string): void {
        const user = this.getUserByPhone(phone);
        if (user) {
            const tariff = this.getTariffByName(name);
            if (tariff) {
                user.tariff = tariff;
            }
        }
    }

    public getUserBalance(phone: string): number | undefined {
        const user = this.getUserByPhone(phone);
        if (user) {
            return user.balance;
        }
    }

    public addUserBalance(phone: string, balance: number): void {
        const user = this.getUserByPhone(phone);
        if (user) {
            user.addBalance(balance);
        }
    }

    public withdrawPayOfTariff(phone: string): void {
        const user = this.getUserByPhone(phone);
        if (user) {
            const tariff = this.getUserTariff(phone);
            if (tariff && user.payStatus === false) {
                user.removeBalance(tariff.price);
                user.payStatus = true;
            }
        }
    }

    public getMessageById(id: number): IMessagable | null {
        return this._messageList.getById(id);
    }

    public getRecieverMessages(phone: string): IMessagable[] {
        return this._messageList.toArray().filter(item => item.reciever === phone);
    }

    public getCreatorMessages(phone: string): IMessagable[] {
        return this._messageList.toArray().filter(item => item.creator === phone);
    }

    private static setMessageType(message: IMessagable): void {
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

    public addMessage(message: IMessagable): void {
            this._messageList.add(message);
        }

    public deleteMessageById(id: number): void {
        const message = this.getMessageById(id);
        if (message) {
            this._messageList.remove(message);
        }
    }

   private isAvialableMessageType(message: IMessagable): boolean{
            Manager.setMessageType(message);
            const tariff = this.getUserTariff(message.creator);
            if(tariff && message.type){
                if (tariff.messageTypes.includes(message.type)){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
    }

   public sendMessage(message: IMessagable): Promise<IMessagable[]> { //param callback
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const creator = this.getUserByPhone(message.creator);
                const reciever = this.getUserByPhone(message.reciever);
                if (creator && reciever) {
                    if (creator.payStatus) {
                            if (this.isAvialableMessageType(message)) {
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
                resolve(this.getRecieverMessages(message.reciever));
            }, 2000);
        });
    }
}
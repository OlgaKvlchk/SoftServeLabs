interface IMessagable{
    readonly id: number;
    readonly creator: string;
    readonly reciever: string;
    readonly body: string;
    type: MessageType | null;
}
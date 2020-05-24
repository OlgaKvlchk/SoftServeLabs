interface ITarifable{
    readonly id: number;
    name: string;
    readonly messageTypes: MessageType[];
    addMessageTypes(messageTypes: MessageType[]): void;
    deleteMessageTypes(messageTypes: MessageType[]): void;
    price: number;
}
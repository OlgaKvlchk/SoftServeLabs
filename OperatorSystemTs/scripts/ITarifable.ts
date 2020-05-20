interface ITarifable{
    readonly id: number;
    name: string;
    readonly messageTypes: string[];
    addMessageTypes(messageTypes: string[]): void;
    deleteMessageTypes(messageTypes: string[]): void;
    price: number;
}
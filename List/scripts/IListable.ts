interface IListable<T>{
    add(item: T): void;
    get(index: number): T | null;
    remove(index: number): void;
    //getByName(name: string): T | null;
    toArray(): T[];
    clear(): void;
    size(): number;
    //removeByName(name: string): void;
}

export default IListable;
interface IListable<T>{
    add(item: T): void;
    remove(item: T): void;
    getByIndex(index: number): T | null;
    removeByIndex(index: number): void;
    getById(id: number): T | null;
    removeById(id: number): void;
    toArray(): T[];
    clear(): void;
    size(): number;
}
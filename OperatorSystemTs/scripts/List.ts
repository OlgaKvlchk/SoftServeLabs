class List<T extends {id: number | string}> implements IListable<T>{
    private list: T[] = [];

    public add(item: T): void {
        this.list.push(item);
      }

    public remove(item: T): void{
        const index = this.list.indexOf(item);
        if(index != -1){
            this.removeByIndex(index);
        }
    }

    public getByIndex(index: number): T | null{
        if (index >= 0){
            return this.list[index] || null;
        } else {
            return null;
        }
    }

    public removeByIndex(index: number): void{
        if (index >=0){
            this.list.splice(index, 1);
        }
         // add if non exist
    }

    public getById(id: number): T | null{
        const result = this.list.find((item)=>item.id ===id);
        return result || null;
    };

    public removeById(id: number): void{
        const item = this.getById(id);
        if(item){
            this.list.splice(this.list.indexOf(item),1);
        }
    };

    public toArray(): T[]{
        return this.list;
    }

    public clear(): void{
        this.list = []; 
    }

    public size(): number{
        return this.list.length;
    }
}


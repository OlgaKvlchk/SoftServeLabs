
import IListable from "./IListable";

class List<T> implements IListable<T>{
    private list: T[] = [];

    add(item: T): void {
        this.list.push(item);
      }

    get(index: number): T | null{
        if (index >= 0){
            return this.list[index] || null;
        } else {
            return null;
        }
    }

    remove(index: number): void{
        if (index >=0){
            this.list.splice(index, 1);
        }
         // add if negative index
    }

    toArray(): T[]{
        return this.list;
    }

    clear(): void{
        this.list = []; 
    }

    size(): number{
        return this.list.length;
    }
}

let list = new List();
list.add(1);
function display(){
    console.log(list.toArray());
    console.log(list.get(0));
}

display();
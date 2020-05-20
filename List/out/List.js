"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor() {
        this.list = [];
    }
    add(item) {
        this.list.push(item);
    }
    get(index) {
        if (index >= 0) {
            return this.list[index] || null;
        }
        else {
            return null;
        }
    }
    remove(index) {
        if (index >= 0) {
            this.list.splice(index, 1);
        }
        // add if negative index
    }
    toArray() {
        return this.list;
    }
    clear() {
        this.list = [];
    }
    size() {
        return this.list.length;
    }
}
let list = new List();
list.add(1);
function display() {
    console.log(list.toArray());
    console.log(list.get(0));
}
display();
//# sourceMappingURL=List.js.map
class Node {
    value: number;
    next: Node | null;

    constructor(value: number){
        this.value = value;
        this.next = null;
    }
}

class linkList{
    head: Node | null;


    constructor(){
        this.head = null;
    }

    addNode(value: number): void {
        if (this.head === null) {
            this.head = new Node(value);
            return;
        }

        let current = this.head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = new Node(value);
    }

    removeNode(value: number):void {
        if (this.head === null){
            return;
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            return;
}

        let current = this.head as Node | null;

        while(current?.next !== null) {
            if (current.next.value === value) {
                current.next = current.next.next;
                return;
            }

            current = current.next;
        }
    }

         findMin():number {
             if(this.head === null){
                throw new Error("List is empty")
        }

            let current = this.head as Node | null;
            let min = current.value;

             while(current !== null) {
                 if (current.value < min) {
                    min = current.value;
                 }
                
                 current = current.next;
        }
        return min;
    }

        findMax():number{
            if(this.head === null){
                throw new Error("Empty list")
            }

            let current = this.head as Node | null;
            let max = current.value;

            while(current !== null) {
                if(current.value > max) {
                    max = current.value;
                }
                
                current = current.next;

            }

            return max;
        }

        search(value: number): boolean {
            let current = this.head as Node | null;

            while(current !== null) {
                if (current.value === value) {
                    return true;
        }  
                current = current.next;
            }

            return false;

        }

        reverse(): void{
            let prev: Node | null = null;
            let current: Node | null = this.head;
            let next: Node | null = null;

            while (current !== null){
                next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }

            this.head = prev;
        }
}


const list = new linkList();
list.addNode(454);
list.addNode(23);
list.addNode(100);
list.addNode(7);
list.addNode(23);

console.log(list.findMin()); // should print 7
console.log(list.findMax()); // should print 454

console.log(list.search(23));   // true
console.log(list.search(999));  // false

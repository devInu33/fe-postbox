import {Mailbox} from "./Mailbox";

class Visitor{
    el;
    static towns=new Set;
    visit(target, action){
        const stack = []
        let curr = target.firstElementChild
        if (!curr) return
        do {
            action(curr)
            if (curr.firstElementChild) stack.push(curr.firstElementChild)
            if (curr.nextElementSibling) stack.push(curr.nextElementSibling)
        } while (curr = stack.pop())
    }
    print(){
        const arr = []
        Visitor.towns.forEach(element=>arr.push(element.size));
        quickSort(arr);
        document.querySelector('button').innerHTML= ``
    }
}
const action = (element)=>{
    if(element instanceof Town){return;}
    else if(element instanceof Mailbox){
        Visitor.towns.add(element);
    }
}




function quickSort (array, left = 0, right = array.length - 1) {
    if (left >= right) {
        return;
    }
    const mid = Math.floor((left + right) / 2);
    const pivot = array[mid];
    const partition = divide(array, left, right, pivot);
    quickSort(array, left, partition - 1);
    quickSort(array, partition, right);
    function divide (array, left, right, pivot) {
        console.log(`array: ${array}, left: ${array[left]}, pivot: ${pivot}, right: ${array[right]}`)
        while (left <= right) {
            while (array[left] < pivot) {
                left++;
            }
            while (array[right] > pivot) {
                right--;
            }
            if (left <= right) {
                let swap = array[left];
                array[left] = array[right];
                array[right] = swap;
                left++;
                right--;
            }
        }
        return left;
    }
    return array;
}


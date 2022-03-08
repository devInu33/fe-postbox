
import { quickSort } from "./util.js";

export class Visitor {
  el;
  static boxes = new Set();
  visit(target, action) {
    const stack = [];
    let curr = target.firstElementChild;
    if (!curr) return;
    do {
      action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while ((curr = stack.pop()));
  }
  print() {
    const arr = [];
    Visitor.boxes.forEach((element) => arr.push(element.size));
    quickSort(arr);
    document.querySelector(".info").insertAdjacentHTML('beforeend', `
      ${arr.map(size=>`${size}`).join(',')}
    `);
  }
}

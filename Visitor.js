import { quickSort } from "./util.js";
import {Mailbox} from "./Mailbox.js";

export class Visitor {
  el;
  #target;
  #action;
  static boxes = new Set();
  constructor(target, action) {
    this.#target= target;
    this.#action = action;
    const info = document.createElement("div");
    info.innerHTML = `
      <button class="redbutton">빨강 우체통 확인</button>
       <div class="description"></div>
    `
    info.classList.add("info");
    document.body.appendChild(info);

    info.button.addEventListener("click", ({target}) => {
      this.visit(target, action);
      this.print();
    });
  }
  visit() {
    const stack = [];
    let curr = this.#target.firstElementChild;
    if (!curr) return;
    do {
      this.#action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while ((curr = stack.pop()));
  }
  print() {
    const sizes = [];
    const towns= [];
    Visitor.boxes.forEach((mailbox) => {
      sizes.push(mailbox.size)
      towns.push(mailbox.parent)
    });
    quickSort(sizes);


    // (".info>.description").innerHTML =
    //     `<p>${sizes.map(size=>`${size}`).join(',')}</p>
    // <p>${towns.map(town=>`${town.name}`).join(',')}</p>`;
  }
}

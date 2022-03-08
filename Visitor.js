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
    const button = document.createElement("button");
    const description  =document.createElement('div');
    button.innerText = `빨간 우체통 확인`;
    info.appendChild(button);
    info.appendChild(description)
    info.classList.add("info");
    button.classList.add("redbutton");
    description.classList.add('description');
    document.body.appendChild(info);

    button.addEventListener("click", () => {
      this.visit(target, action);
      this.print();
    });
  }
  visit() {
    const stack = [];
    // debugger;
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
    console.log(Visitor.boxes);
    quickSort(sizes);


    document.querySelector(".info>.description").innerHTML =
        `<p>${sizes.map(size=>`${size}`).join(',')}</p>
    <p>${towns.map(town=>`${town.name}`).join(',')}</p>`;
  }
}

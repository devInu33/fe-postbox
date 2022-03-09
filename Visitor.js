import { quickSort } from "./util.js";
import { Mailbox } from "./Mailbox.js";

export class Visitor {
  el;
  #target;
  #action;
  constructor(target, action) {
    this.#target = target;
    this.#action = action;
    const info = document.createElement("div");

    info.innerHTML = `
      <button class="redbutton">빨강 우체통 확인</button>
       <div class="description"></div>
    `;
    info.classList.add("info");
    document.body.appendChild(info);

    info.querySelector(".redbutton").addEventListener("click", ({ target }) => {
      Visitor.towns = [];
      Visitor.sizes = [];
      this.visit(target, action);
      this.print();
    });
  }
  visit() {
    const stack = [];
    // debugger;
    let curr = this.#target.element.firstElementChild;
    if (!curr) return;
    do {
      this.#action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while ((curr = stack.pop()));
  }
  print() {
    const sizes = [];
    const towns = [];
    for (const box of Model.boxes) {
      sizes.push(box);
      towns.push(box);
    }

    quickSort(sizes, (a, b) => {
      const {
        mailBox: { size: asize },
      } = a;
      const {
        mailBox: { size: bsize },
      } = b;
      if (asize < bsize) {
        return -1;
      } else if (asize > bsize) {
        return 1;
      } else {
        return 0;
      }
    });

    document.querySelector(".info>.description").innerHTML = `<p>${sizes
      .reverse()
      .map((size) => `${size.name}`)
      .join(",")}</p>
    <p>${towns.map((town) => `${town.name}`).join(",")}</p>`;
  }
}

import { quickSort } from "./util.js";
import { Mailbox } from "./Mailbox.js";

export class Visitor {
  el;
  #target;
  #action;
  static sizes = [];
  static towns = [];
  constructor(target, action) {
    this.#target = target;
    this.#action = action;
    const info = document.createElement("div");
    info.appendChild(button);
    info.appendChild(description);
    info.classList.add("info");

    const button = document.createElement("button");
    button.innerText = `빨간 우체통 확인`;
    button.classList.add("redbutton");

    const description = document.createElement("div");
    description.classList.add("description");
    document.body.appendChild(info);

    button.addEventListener("click", () => {
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
    quickSort(Visitor.sizes);

    document.querySelector(".info>.description").innerHTML = `<p>${Visitor.sizes
      .map((size) => `${size}`)
      .join(",")}</p>
    <p>${Visitor.towns.map((town) => `${town}`).join(",")}</p>`;
  }
}

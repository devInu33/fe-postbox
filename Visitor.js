import { quickSort } from "./util.js";

export class Visitor {
  el;
  #boxes = new Set();
  constructor(target, action) {
    const info = document.createElement("div");
    const button = document.createElement("button");
    button.innerText = `빨간 우체통 확인`;
    info.appendChild(button);
    info.classList.add("info");
    button.classList.add("redbutton");
    document.body.appendChild(info);

    button.addEventListener("click", () => {
      this.visit(target, action);
      this.print();
    });
  }
  visit() {
    const stack = [];
    // debugger;
    let curr = this.firstElementChild;
    if (!curr) return;
    do {
      this.action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while ((curr = stack.pop()));
  }
  print() {
    const arr = [];
    this.#boxes.forEach((element) => arr.push(element.size));
    quickSort(arr);
    document.querySelector(".info").insertAdjacentHTML(
      "beforeend",
      `
      ${arr.map((size) => `${size}`).join(",")}
    `
    );
  }
}


import { Model } from "./Model.js";
import { quickSort } from "./util.js";
import {DomVisitor, ModelVisitor} from "./Visitor.js";
import {ButtonScanner, DomScanner} from "./Scanner.js";

export const CheckButton = class {
  scanner=new DomScanner(new DomVisitor());
  target = document.createElement("div");
  constructor(callback) {

    this.target.innerHTML = `
      <button class="redbutton">빨강 우체통 확인</button>
       <div class="description"></div>
    `;
    this.target.classList.add("info");
    document.body.appendChild(this.target);

    const button = this.scanner.scan(this.target, 'redbutton');
    button.addEventListener("click", ({ target }) => {
      callback();
      this.print();
    });
  }
  print() {
    const sizes = [];
    const towns = [];
    for (const box of ButtonScanner.boxes) {
      sizes.push(box);
      towns.push(box);
      box.el.style.border = `2px solid red`;
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

    this.scanner.scan(this.target,"description").innerHTML = `<p>${sizes
      .reverse()
      .map((size) => `${size.name}`)
      .join(",")}</p>
    <p>${towns.map((town) => `${town.name}`).join(",")}</p>`;
  }
};


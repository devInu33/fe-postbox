import { Model } from "./Model.js";
import { quickSort } from "./util.js";
import {DomVisitor, ModelVisitor} from "./Visitor.js";
import {DomScanner, ModelScanner} from "./Scanner";

export const CheckButton = class {
  constructor(callback) {
    const info = document.createElement("div");
    info.innerHTML = `
      <button class="redbutton">빨강 우체통 확인</button>
       <div class="description"></div>
    `;
    info.classList.add("info");
    document.body.appendChild(info);

    info.querySelector(".redbutton").addEventListener("click", ({ target }) => {
      callback();
      this.print();
    });
  }
  print() {


    const sizes = [];
    const towns = [];
    for (const box of ModelScanner.boxes) {
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

    document.querySelector(".info>.description").innerHTML = `<p>${sizes
      .reverse()
      .map((size) => `${size.name}`)
      .join(",")}</p>
    <p>${towns.map((town) => `${town.name}`).join(",")}</p>`;
  }
};

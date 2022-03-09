import { quickSort } from "./util.js";
import { Mailbox } from "./Mailbox.js";
import {Model} from "./Model.js";

export class Visitor {
  el;
  #target;
  #action;
  constructor(target, action) {
    this.#target = target;
    this.#action = action;
  }
  visit() {
    const stack = [];
    let curr = this.#target.el.firstElementChild;
    if (!curr) return;
    do {
      this.#action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while ((curr = stack.pop()));
  }

}


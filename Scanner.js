
import {ModelVisitor} from "./Visitor.js";

export default class Scanner {

  #visitor;
  constructor(visitor) {
    this.#visitor = visitor;
  }
  visit(f, target) {
    this.#visitor.visit(f, target);
  }
  scan(target) {
    throw "override";
  }
}

export class RenderScanner extends Scanner {
  scan(target) {
    const f = (target) => {
      !target.parent? document.body.appendChild(target.el) :target.parent.el.appendChild(target.el);
    };
    f(target);
    this.visit(f, target);
  }
}
export class DomScanner extends Scanner{
  scan(target, selector) {
    let el;
    const f = element=>{
      if(element.classList.contains(selector)){el= element; return;}
    }
    f(target);
    this.visit(f,target);
    return el;
  }
}
export class ButtonScanner extends Scanner {
  static boxes = new Set();
  scan(target) {
    const arr = [];
    const f = (target) => {
      if (target.mailBox) {
        ButtonScanner.boxes.add(target);
      }
    };
    f(target);
    this.visit(f, target);
  }
}

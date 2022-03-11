// import Town from "./Town";
// import {Mailbox} from "./Mailbox";
//
// class Scanner{
//     #visitor;
//     constructor(visitor) {
//         this.#visitor = visitor;
//     }
//     visit(f,target){this.#visitor.visit(f,target);}
//     scan(target){
//         const binder = new Binder, f= el=>{
//             const model = el.className;
//             if(model instanceof Town) binder.add(new Town())
//             else if(model instanceof Mailbox)binder.add(new Mailbox())
//         }
//         f(target);
//         this.visit(f,target)
//         throw 'override';
//     }
// }
// class Binder{
//     #items = new Set;
//     add(v){
//         this.#items.add(v)
//     }
//     render(){
//         this.#items.forEach(item=>{
//             item.
//         })
//     }
// }
// class Model{
//     #parent;
//     el;
//     constructor(parent) {
//         this.#parent = parent;
//     }
//     _render(){
//         throw 'override';
//     }
//     render(){
//         this._render()
//         this.#parent.
//     }
// }

import {ModelVisitor} from "./Visitor.js";

export default class Scanner {

  #visitor;
  constructor(visitor) {
    this.#visitor = visitor;
  }
  visit(f, target) {
    this.#visitor.visit(f, target);
  }
  scan(model) {
    throw "override";
  }
}

export class DomScanner extends Scanner {
  scan(model) {
    const f = (target) => {
      if (!target.parent) {
        document.body.appendChild(target.el);
      } else {
        target.parent.el.appendChild(target.el);
      }
    };
    f(model);
    this.visit(f, model);
  }
}

export class ModelScanner extends Scanner {
  static boxes = new Set();
  scan(model) {
    const arr = [];
    const f = (target) => {
      if (target.mailBox) {
        ModelScanner.boxes.add(target.name);
      }
    };
    f(model);
    this.visit(f, model);
  }
}

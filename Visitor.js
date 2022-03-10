export class DomVisitor extends Visitor {
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

class Visitor {
  visit(action, target) {
    throw "Override";
  }
}

// Data
export class ModelVisitor extends Visitor {
  visit(action, target) {
    if(!target.children.size)return;
    target.children.forEach(child=>{
      action(child);
      this.visit(child)
    })
  }
}

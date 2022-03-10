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
    // town -> children 순회
    const stack = [];
    let curr = target;
    if (!curr) return;
    do {
      action(curr);
      const children = Array.from(curr.children);
      if (children.length) {
        stack.push(children.pop());
      }
    } while ((curr = stack.pop()));
  }
}

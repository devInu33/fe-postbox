class Visitor {
  visit(action, target) {
    throw "Override";
  }
}

export class DomVisitor extends Visitor {
  visit(action, target) {
    const stack = [];
    let curr = target.el.firstElementChild;
    if (!curr) return;
    do {
      action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while ((curr = stack.pop()));
  }
}

export class ModelVisitor extends Visitor {
  visit(action, target) {
    if (!target.children.size) return;
    target.children.forEach((child) => {
      action(child);
      this.visit(action, child);
    });
  }
}

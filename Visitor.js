
class Visitor {
  visit(action, target) {
    throw "Override";
  }
}

export class DomVisitor extends Visitor {
  visit(action, target) {
    const stack = [];
    let curr = target.firstElementChild;
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
    const stack= [];
    let curr = target.child;
    if(!curr)return;
    do{
      action(curr);
      if(curr.child) stack.push(curr.child);
      if(curr.next)stack.push(curr.next);
    }while((curr=stack.pop()));

  }
}

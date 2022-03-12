import { randomNum } from "./util.js";
import {ModelVisitor} from "./Visitor.js";

export class Model {
  parent;
  el = document.createElement("div");
  next = null;
  child= null;
  static #root= null;
  static objects = new Set();
  visitor = new ModelVisitor();
  constructor(parent = null) {
    this.parent = parent;
    Model.objects.add(this);
  }
  setNext(v){
    let curr= this;
    while(curr.next){
      curr = curr.next;
    }
    curr.next = v;

  }
  setChild() {
    if(!this.parent)Model.objects.delete(this);
    const num = randomNum(Model.objects.size);
    this._setChild(num)
    if(this.next)this.next.setChild();
    if(this.child)this.child.setChild();
  }


  _setChild(num) {

    throw "Override";
  }
}

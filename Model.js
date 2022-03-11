import { randomNum } from "./util.js";
import {ModelVisitor} from "./Visitor.js";

export class Model {
  parent;
  el = document.createElement("div");
  next = null;
  child;
  static objects = new Set();
  static boxes = new Set();
  visitor = new ModelVisitor();
  constructor(parent = undefined) {
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
  render() {

    const num = randomNum(Model.objects.size);
    Model.objects.delete(this);
    this.el.style.height = this.parent
      ? `${Math.floor(parseInt(this.parent.el.style.height) / num)}px`
      : `${document.documentElement.clientHeight}px`;
    this.el.style.width = this.parent
      ? `${Math.floor(parseInt(this.parent.el.style.width) / num)}px`
      : `${document.documentElement.clientWidth}px`;

    if(this._render().next().done){
      if(this.next)this.next.render();
      if(this.child)this.child.render();
    }


  }


  *_render() {

    throw "Override";
  }
}

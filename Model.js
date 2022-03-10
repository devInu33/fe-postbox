import { randomNum } from "./util.js";

export class Model {
  parent;
  el = document.createElement("div");
  children = new Set();
  static objects = new Set();
  static boxes = new Set();

  constructor(parent = undefined) {
    this.parent = parent;
    Model.objects.add(this);
  }

  render() {
    Model.objects.delete(this);
    let num = randomNum(Model.objects.size);
    this.el.style.width = `${Math.floor(
      parseInt(this.parent.style.width) / 2
    )}px`;
    this.el.style.height = `${Math.floor(
      parseInt(this.parent.style.height) / 2
    )}px`;

    this.parent.children.add(this);
    this._render();
  }

  _render() {
    throw "Override";
  }
  next(v){
    this.#next = v;
    return this.#next;
  }
}
export class View{
  model;
  constructor(model) {
    this.model =model;
  }
  render(model){
    let num = randomNum(Model.objects.size);
    const start = model;
    while(num){
      num-=1
      model = model.next(new Model())
    }
  }

}

import { randomNum } from "./util.js";

export class Model {
  parent;
  el = document.createElement("div");
  #next = null;
  children = new Set();
  static objects = new Set();
  static boxes = new Set();

  constructor(parent = undefined) {
    this.parent = parent;
    Model.objects.add(this);
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
    for (const model of this._render()){
      model.render()
    }
  }


  *_render() {
    throw "Override";
  }
}

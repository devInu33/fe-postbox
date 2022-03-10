import { randomNum } from "./util.js";

export class Model {
  parent;
  el = document.createElement("div");
  static objects = new Set();
  static boxes = new Set();

  constructor(parent) {
    this.parent = parent;
  }

  render() {
    Model.objects.delete(this);

    let num = randomNum(Model.objects.size);
    this.el.style.width = `${Math.floor(
      parseInt(this.parent.style.width) / num
    )}px`;
    this.el.style.height = `${Math.floor(
      parseInt(this.parent.style.height) / num
    )}px`;

    this._render();
    this.parent.appendChild(this.el);
  }

  _render() {
    throw "Override";
  }
}

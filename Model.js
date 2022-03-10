import { randomNum } from "./util.js";

export class Model {
  parent;
  el = document.createElement("div");
  children = new Set();
  static objects = new Set();
  static boxes = new Set();

  constructor(parent = undefined) {
    if (parent) {
      this.parent = parent;
    }
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

    if (!this.parent) {
      document.body.appendChild(this);
    } else {
      this.parent.children.add(this);
    }

    this._render();
  }

  _render() {
    throw "Override";
  }
}

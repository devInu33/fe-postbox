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

    // this.el.style.width = `${Math.floor(
    //   parseInt(this.parent.el.style.width) / num
    // )}px`;
    // this.el.style.height = `${Math.floor(
    //   parseInt(this.parent.el.style.height) / num
    // )}px`;
    this.parent ??
      (this.el.style.height = `${document.documentElement.clientHeight}px`);
    this.parent ??
      (this.el.style.width = `${document.documentElement.clientWidth}px`);

    this.parent?.children.add(this);

    this._render();
  }

  _render() {
    throw "Override";
  }
}

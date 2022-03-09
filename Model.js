export class Model {
  parent;
  el = document.createElement("div");
  static objects = new Set();
  static boxes = new Set();

  constructor(parent) {
    this.parent = parent;
  }

  render() {
    this._render();
    this.parent.appendChild(this.el);
  }

  _render() {
    throw "Override";
  }
}

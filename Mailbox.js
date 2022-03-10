import { Model } from "./Model.js";

export class Mailbox extends Model {
  size;

  constructor(size, parent) {
    super(parent);
    this.size = size;
  }

  _render() {
    this.el.classList.add("mailbox");
    this.el.innerText = `📮`;
    this.el.dataset["size"] = this.size;
  }
}

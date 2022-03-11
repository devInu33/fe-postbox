import { Model } from "./Model.js";

export class Mailbox extends Model {
  size;

  constructor(size, parent = null) {
    super(parent);
    this.size = size;
  }
  *_render() {
    if (this.parent.mailBox) return;
    else {
      this.el.classList.add("mailbox");
      this.el.innerText = `📮`;
      this.el.dataset["size"] = this.size;
      this.parent.mailBox = this;
    }

  }
}

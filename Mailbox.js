import { Model } from "./Model.js";

export class Mailbox extends Model {
  size;

  constructor(size, parent = null) {
    super(parent);
    this.size = size;
  }

  createMailbox() {
    const size = Math.floor(Math.random() * Model.objects.size + 1);
    this.mailBox = new Mailbox(size, this.el);
    this.mailBox.render();
    Model.boxes.add(this);
  }

  _render() {
    if (this.parent.mailBox) return;
    else {
      this.el.classList.add("mailbox");
      this.el.innerText = `📮`;
      this.el.dataset["size"] = this.size;
      this.parent.mailBox = this;
    }
    Model.objects.delete(this);
  }
}

import { Model } from "./Model.js";
import { randomBoolean, randomNum } from "./util.js";
import { Mailbox } from "./Mailbox.js";

export default class Town extends Model {
  mailBox = null;
  name;
  // #next = null;
  constructor(name = undefined, parent = null) {
    super(parent);
    this.name = name;
  }
  static shape() {}
  _render() {
    let num = randomNum(Model.objects.size);

    parent ? this.el.classList.add("town") : this.el.classList.add("base");
    this.el.dataset["name"] = this.name;
    if (randomBoolean()) {
      new Mailbox(randomNum(num), this);
    }
    if (!Model.objects.size) return;
    if (this.gene().next().done) return;
    this.children.forEach((child) => child.render());
  }
}

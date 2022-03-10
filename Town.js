import { Model } from "./Model.js";
import { randomBoolean, randomNum } from "./util.js";

export default class Town extends Model {
  mailBox = null;
  name;
  #next = null;
  constructor(name = undefined, parent = null) {
    super(parent);
    this.name = name;
  }

  _render() {
    let num = randomNum(Model.objects.size);
    this.el.classList.add("town");
    this.el.dataset["name"] = this.name;
    const bool = randomBoolean();
    if (bool) {
      this.createMailbox();
    }
    if (!Model.objects.size) return;
    for (const town of Model.objects) {
      if (num) {
        town.parent = this;
        town.render();
        num--;
      }
    }
  }
}

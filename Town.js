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
    const parentWidth = parseInt(this.parent.style.width);
    const parentHeight = parseInt(this.parent.style.height);
    this.el.style.width = `${Math.floor(
        parentWidth /num 
    )}px`;
    this.el.style.height = `${Math.floor(
        parentHeight / num
    )}px`;
    // this.el.style.left= `${Math.random() * parentWidth - parentHeight}px`;
    // this.el.style.top= `${Math.random() * parentHeight - parentWidth}px`;
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

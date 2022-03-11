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

  *_render() {
    let num = randomNum(Model.objects.size);
    parent ? this.el.classList.add("town") : this.el.classList.add("base");
    this.el.dataset["name"] = this.name;
    if (randomBoolean()) {
      new Mailbox(randomNum(num), this);
    }
    if (!Model.objects.size) return;
    for (const model of Model.objects){
      if(num<=0)break;
      num-=1;
      model.parent = this;
      this.children.add(model)
      yield model;
    }


  }

}


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

  * _render() {
    let num = randomNum(Model.objects.size);
    parent ? this.el.classList.add("town") : this.el.classList.add("base");
    this.el.dataset["name"] = this.name;
    if(randomBoolean()){
      this.mailBox= new Mailbox(Math.floor(Math.random()*num+1), this);
    }
    if (!Model.objects.size) yield;

    for (const model of Model.objects) {
      if (num <= 0) yield;
      num -= 1;
      model.render()
      if (!this.child)
        this.child = model
      else {
        this.child.setNext(model)
      }
      model.parent = this;
    }
  }
}



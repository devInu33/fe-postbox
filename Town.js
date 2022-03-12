
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
    if(randomBoolean()  ){
      this.mailBox = new Mailbox(Math.floor(Math.random()*Model.objects.size), this);
    }
  }

   _setChild(num) {

    this.parent? this.el.classList.add("town"):this.el.classList.add('base');
    this.el.dataset["name"] = this.name;
   this.el.style.height = this.parent
       ? `${Math.floor(parseInt(this.parent.el.style.height) / 5)}px`
       : `${1200}px`;
   this.el.style.width = this.parent
       ? `${Math.floor(parseInt(this.parent.el.style.width) / 5)}px`
       : `${1200}px`;


    for (const model of Model.objects) {
      if(num<=0)break;
      num -= 1;
      !this.child? this.child=model :this.child.setNext(model)
      model.parent = this;
      Model.objects.delete(model)
    }

  }
}



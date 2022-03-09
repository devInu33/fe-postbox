import { Mailbox } from "./Mailbox.js";
import { Model } from "./Model.js";
import { randomBoolean, randomNum } from "./util.js";

<<<<<<< HEAD
export default class Town {
  #parent;
=======
export default class Town extends Model {
>>>>>>> 66b2891518bf3cda29c9525135d878a9050d7ef0
  mailBox = null;
  name;

  constructor(name = undefined, parent = null) {
    super(parent);
    this.name = name;
    Model.objects.add(this);
  }

  _render() {
    Model.objects.delete(this);
    let num = randomNum(Model.objects.size);
    this.el.style.width = `${this.parent.clientWidth / num}px`;
    this.el.style.height = `${this.parent.clientHeight / num}px`;
    this.el = document.createElement("div");
    this.el.classList.add("town");
    this.el.dataset["name"] = this.name;

<<<<<<< HEAD
    this.#parent.appendChild(this)
=======
    const bool = randomBoolean();

>>>>>>> 66b2891518bf3cda29c9525135d878a9050d7ef0
    if (bool) {
      this.createMailbox();
    }

    if (!Model.objects.size) return;

    for (const town of Model.objects) {
      if (num) {
        town.#parent = this.element;
        town.render();
        num--;
      }
    }
  }
  createMailbox() {
    const size = Math.floor(Math.random() * Model.objects.size + 1);
    this.mailBox = new Mailbox(size, this);
    this.mailBox.render();
    Model.boxes.add(this);
  }
}

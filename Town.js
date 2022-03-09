import { Mailbox } from "./Mailbox.js";
import { randomBoolean, randomNum } from "./util.js";

export default class Town {
  #parent;
  #children = new Set();
  mailBox = null;
  element;
  static #objects = new Set();

  constructor(name = undefined, parent = null) {
    this.#parent = parent;
    this.element = document.createElement("div");
    this.element.classList.add("town");
    this.element.dataset["name"] = name;
    Town.#objects.add(this);
  }

  render() {
    Town.#objects.delete(this);
    this.element.style.width = `${this.#parent.clientWidth / 2}px`;
    this.element.style.height = `${this.#parent.clientHeight / 2}px`;
    this.#parent.appendChild(this.element);

    let num = randomNum(Town.#objects.size);
    const bool = randomBoolean();

    if (bool) {
      this.createMailbox();
    }
    if(!Town.#objects.size)return;
    for (const town of Town.#objects){
      if (num) {
        // this.#children.add(town);
        town.#parent = this.element;
        town.render();
        num--;
      }
    }
  }
  createMailbox() {
    const size = Math.random() + 1;
    this.mailBox = new Mailbox(size, this.element);
    this.mailBox.render();
  }
}

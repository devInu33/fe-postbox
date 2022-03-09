import { Mailbox } from "./Mailbox.js";
import { randomBoolean, randomNum } from "./util.js";
import {Visitor} from "./Visitor.js";

export default class Town {
  #parent;
  mailBox = null;
  element;
  name;
  static #objects = new Set();

  constructor(name = undefined, parent = null) {
    this.#parent = parent;
    this.name = name;
    this.element = document.createElement("div");
    this.element.classList.add("town");
    this.element.dataset["name"] = name;
    Town.#objects.add(this);
  }

  render() {
    Town.#objects.delete(this);
    let num = randomNum(Town.#objects.size);
    const bool = randomBoolean();
    this.element.style.width = `${this.#parent.clientWidth / num}px`;
    this.element.style.height = `${this.#parent.clientHeight / num}px`;
    this.#parent.appendChild(this.element);


    this.#parent.appendChild(this)
    if (bool) {
      this.createMailbox();
    }
    if(!Town.#objects.size)return;
    for (const town of Town.#objects){
      if (num) {
        town.#parent = this.element;
        town.render();
        num--;
      }
    }
  }
  createMailbox() {
    const size = Math.floor(Math.random()*Town.#objects.size+1);
    this.mailBox = new Mailbox(size, this.element);
    Visitor.boxes.add(this)
    this.mailBox.render();
  }
}

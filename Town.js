import {Mailbox} from "./Mailbox";

export default class Town {
  #parent;
  #children = new Set();
  mailBox = null;
  element;
  static #objects = new Set();

  constructor(parent) {
    this.#parent = parent;
    this.element = document.createElement("div");
    Town.#objects.add(this);
  }

  render() {
    Town.#objects.delete(this);
    this.element.style.width = `${this.#parent.width / 2}px`;
    this.element.style.height = `${this.#parent.height / 2}px`;
    this.#parent.appendChild(this.element);

    let num = Math.random()*Town.#objects.size;
    const bool = Math.random()<0.5;
    if (Town.#objects.size) {
      Town.#objects.forEach((town) => {
        if (num > 0) {
          this.#children.add(town);

          town.#parent = this;
          town.render();
          if(bool){
            town.createMailbox()
          }
          num--;
        }
      });

    } else return;
  }
  createMailbox(){
    const size = Math.random()+1
    this.mailBox = new Mailbox(this, size);
    this.mailBox.render();
  }
}
